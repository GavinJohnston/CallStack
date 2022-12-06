using System.IO;
using CallstackAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Security.Principal;
using System.Security.Claims;
using Azure.Core;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Http;
using CallstackAPI.Services;
using Microsoft.AspNetCore.JsonPatch;
using System.IO.Compression;

namespace CallstackAPI.Controllers;

[ApiController]
[Route("")]
public class CallstackController : ControllerBase
{

    private readonly CallstackContext _context;
    private readonly IUserStore<ApplicationUser> _userStore;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserEmailStore<ApplicationUser> _emailStore;
    private readonly IEmailSender _emailSender;
    private readonly IConfiguration _jwtSettings;


    public CallstackController(CallstackContext context,
                UserManager<ApplicationUser> userManager,
                IUserStore<ApplicationUser> userStore,
                SignInManager<ApplicationUser> signInManager,
                IEmailSender emailSender,
                IConfiguration configuration)
    {
        _context = context;
        _userManager = userManager;
        _userStore = userStore;
        _emailStore = GetEmailStore();
        _signInManager = signInManager;
        _emailSender = emailSender;
        _jwtSettings = configuration.GetSection("Jwt");
    }

    [HttpPost]
    [Route("Register")]
    public async Task<ActionResult> RegisterUser(UserRegister userRegister)
    {

        var user = CreateUser();

        await _userStore.SetUserNameAsync(user, userRegister.RegisterEmail, CancellationToken.None);
        await _emailStore.SetEmailAsync(user, userRegister.RegisterEmail, CancellationToken.None);
        var result = await _userManager.CreateAsync(user, userRegister.RegisterPassword);

        if(userRegister.EmployerAccCheck == true)
        {
            await _userManager.AddToRoleAsync(user, "Employer");
        } else
        {
            await _userManager.AddToRoleAsync(user, "Visitor");
        }

        return Ok(result);

    }

    [HttpPost]
    [Route("Login")]
    public async Task<ActionResult> LoginUser(UserLogin userLogin)
    {
        var user = await _userManager.FindByEmailAsync(userLogin.LoginEmail);

        if (user != null && await _userManager.CheckPasswordAsync(user, userLogin.LoginPassword))
        {
            var signingCredentials = GetSigningCredentials();

            var claims = GetClaims(user);

            var tokenOptions = GenerateTokenOptions(signingCredentials, await claims);

            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(token);
        }

        return Unauthorized("Invalid Authentication");
    }



    [HttpPost]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("updateProfile")]
    public async Task<IActionResult> updateProfile(ApplicationUser applicationUser)
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = _userManager.Users.Where(u => u.UserName == userName).FirstOrDefault();

        user.FirstName = applicationUser.FirstName;
        user.LastName = applicationUser.LastName;
        user.Website = applicationUser.Website;
        user.SkillLevel = applicationUser.SkillLevel;
        user.Education = applicationUser.Education;
        
        IdentityResult result = await _userManager.UpdateAsync(user);

        return Ok(result);
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("updateAccount")]
    public async Task<ActionResult<ApplicationUser>> updateAccount(ApplicationUser applicationUser)
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = _userManager.Users.Where(u => u.UserName == userName).FirstOrDefault();

        user.CompanyGroup = applicationUser.CompanyGroup;
        user.Website = applicationUser.Website;

        IdentityResult result = await _userManager.UpdateAsync(user);

        return Ok(result);
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("PostCV")]
    public async Task<ActionResult<Advert>> postCV(IFormFile file)
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = _userManager.Users.Where(u => u.UserName == userName).FirstOrDefault();

        CV cv = new CV();

        using (var ms = new MemoryStream())
        {
            file.CopyTo(ms);
            var fileBytes = ms.ToArray();
            //s = Convert.ToBase64String(fileBytes);
            cv.userCV = fileBytes;
        }

        cv.ApplicationUserId = user.Id;

        _context.CV.Add(cv);

        await _context.SaveChangesAsync();

        return Ok(cv);
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("PostAdvert")]
    public async Task<ActionResult<Advert>> postInfo(Advert advert)
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = _userManager.Users.Where(u => u.UserName == userName).FirstOrDefault();

        advert.ApplicationUserId = user.Id;

        _context.Advert.Add(advert);

        await _context.SaveChangesAsync();

        return Ok(advert);
    }

    [HttpGet]
    [Route("notApprovedList")]
    public async Task<ActionResult<IEnumerable<Advert>>> getAwaitingList()
    {
        var items = await _context.Advert.ToListAsync();

        List<Advert> awaitingApproval = new List<Advert>();

        foreach (Advert element in items)
        {
            if (element.isApproved == false)
            {
                awaitingApproval.Add(element);
            }
        }

        return Ok(awaitingApproval);
    }

    [HttpGet]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("getCV")]
    public async Task<ActionResult<Advert>> getCVDate()
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = await _userManager.Users.Where(u => u.UserName == userName).FirstOrDefaultAsync();

        var cv = await _context.CV.Where(u => u.ApplicationUserId == user.Id).FirstOrDefaultAsync();

        return Ok(cv.Date);
    }

    [HttpGet]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("downloadCV")]
    public async Task<ActionResult<Advert>> downloadCV()
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = await _userManager.Users.Where(u => u.UserName == userName).FirstOrDefaultAsync();

        var cv = await _context.CV.Where(u => u.ApplicationUserId == user.Id).FirstOrDefaultAsync();

        MemoryStream ms = new MemoryStream(cv.userCV);

        return Ok(ms);
    }

    [HttpGet]
    [Route("approvedList")]
    public async Task<ActionResult<IEnumerable<Advert>>> getApprovedList()
    {
        var items = await _context.Advert.ToListAsync();

        List<Advert> approved = new List<Advert>();

        foreach (Advert element in items)
        {
            if (element.isApproved == true)
            {
                approved.Add(element);
            }
        }

        return Ok(approved);
    }

    [HttpGet]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("Profile")]
    public async Task<IActionResult> getProfile()
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = _userManager.Users.Where(u => u.UserName == userName).FirstOrDefault();

        UserProfileDTO userProfile = new UserProfileDTO();

        userProfile.FirstName = user.FirstName;
        userProfile.LastName = user.LastName;
        userProfile.Website = user.Website;
        userProfile.SkillLevel = user.SkillLevel;
        userProfile.Education = user.Education;
        userProfile.Email = user.Email;

        return Ok(userProfile);

    }

    [HttpGet]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("Account")]
    public async Task<IActionResult> getAccount()
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = _userManager.Users.Where(u => u.UserName == userName).FirstOrDefault();

        UserAccountDTO userAccount = new UserAccountDTO();

        userAccount.CompanyGroup = user.CompanyGroup;
        userAccount.Email = user.Email;
        userAccount.Website = user.Website;

        return Ok(userAccount);
    }

    [HttpDelete]
    [Route("deleteItem/{id}")]
    public async Task<IActionResult> deleteItem(int id)
    {
        var item = await _context.Advert.FindAsync(id);

        if (item == null)
        {
            return NotFound();
        }

        _context.Advert.Remove(item);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut]
    [Route("updateItem/{id}")]
    public async Task<IActionResult> putInfo(int id, Advert advert)
    {
        if (id != advert.Id)
        {
            return BadRequest();
        }

        _context.Entry(advert).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return Ok(advert);
    }

    // services

    private SigningCredentials GetSigningCredentials()
    {
        var key = Encoding.UTF8.GetBytes(_jwtSettings.GetSection("Key").Value);

        var secret = new SymmetricSecurityKey(key);

        return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
    }

    private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
    {
        var tokenOptions = new JwtSecurityToken(

            issuer: _jwtSettings.GetSection("Issuer").Value,
            audience: _jwtSettings.GetSection("Audience").Value,
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(_jwtSettings.GetSection("expiryInMinutes").Value)),
            signingCredentials: signingCredentials);
        return tokenOptions;
    }

    private async Task<List<Claim>> GetClaims(ApplicationUser user)
    {
        string roleName = "role";

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Email)
        };
        var roles = await _userManager.GetRolesAsync(user);
        foreach (var role in roles)
        {
            claims.Add(new Claim(roleName, role));
        }
        return claims;
    }

    private ApplicationUser CreateUser()
    {
        try
        {
            return Activator.CreateInstance<ApplicationUser>();
        }
        catch
        {
            throw new InvalidOperationException($"Can't create an instance of '{nameof(ApplicationUser)}'. " +
                $"Ensure that '{nameof(ApplicationUser)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
        }
    }

    private Microsoft.AspNetCore.Identity.IUserEmailStore<ApplicationUser> GetEmailStore()
    {
        if (!_userManager.SupportsUserEmail)
        {
            throw new NotSupportedException("The default UI requires a user store with email support.");
        }
        return (Microsoft.AspNetCore.Identity.IUserEmailStore<ApplicationUser>)_userStore;
    }
}
