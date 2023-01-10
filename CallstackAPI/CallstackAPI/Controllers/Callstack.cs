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
using System.IO.Compression;
using Microsoft.EntityFrameworkCore.Metadata;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Net.Http;
using Newtonsoft.Json;
using Org.BouncyCastle.Utilities;
using iText.Commons.Actions.Contexts;
using Microsoft.AspNetCore.JsonPatch;

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
    [Route("sendCV")]
    public async Task<IActionResult> sendCV(CVView cVView)
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = _userManager.Users.Where(u => u.UserName == userName).FirstOrDefault();

        var cv = await _context.CV.Where(u => u.ApplicationUserId == user.Id).FirstOrDefaultAsync();

        var advert = await _context.Advert.Where(u => u.Id == cVView.AdvertId).FirstOrDefaultAsync();

        cVView.CVId = cv.Id;
        cVView.AdvertAuthorId = advert.ApplicationUserId;
        cVView.AdvertTitle = advert.Title;
        cVView.FullName = $"{user.FirstName} {user.LastName}";
        cVView.Website = user.Website;
        cVView.SkillLevel = user.SkillLevel;
        cVView.Education = user.Education;
        cVView.Email = user.Email;

        _context.CVView.Add(cVView);

        await _context.SaveChangesAsync();

        return Ok(cVView);
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
        cv.FileNameType = file.FileName;

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
    [Route("getCVInfo")]
    public async Task<ActionResult<Advert>> getCVInfo()
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = await _userManager.Users.Where(u => u.UserName == userName).FirstOrDefaultAsync();

        var cv = await _context.CV.Where(u => u.ApplicationUserId == user.Id).FirstOrDefaultAsync();

        CVInfo cvInfo = new CVInfo();

        cvInfo.FileNameType = cv.FileNameType;
        cvInfo.Date = cv.Date;

        return Ok(cvInfo);
    }

    [HttpGet]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("getCVList")]
    public async Task<ActionResult<CV>> getCVList()
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = await _userManager.Users.Where(u => u.UserName == userName).FirstOrDefaultAsync();

        List<CVView> cVViews = _context.CVView.ToList();

        List<CV> cvs = _context.CV.ToList();

        List<CVView> advertsAuthoredList = new List<CVView>();

        for(int i = 0; i < cVViews.Count; i++)
        {
            if (cVViews[i].AdvertAuthorId == user.Id)
            {
                advertsAuthoredList.Add(cVViews[i]);
            }
        }

        List<CVsViewableDTO> CVsViewable = new List<CVsViewableDTO>();

        for (int i = 0; i < cvs.Count; i++)
        {
            foreach (CVView element in advertsAuthoredList)
            {
                if (cvs[i].Id == element.CVId)
                {
                    CVsViewableDTO CVVObj = new CVsViewableDTO();

                    CVVObj.Date = element.Date;
                    CVVObj.FileNameType = cvs[i].FileNameType;
                    CVVObj.AdvertTitle = element.AdvertTitle;
                    CVVObj.AdvertId = element.AdvertId;
                    CVVObj.FullName = element.FullName;
                    CVVObj.SkillLevel = element.SkillLevel;
                    CVVObj.Website = element.Website;
                    CVVObj.Education = element.Education;
                    CVVObj.Email = element.Email;
                    CVVObj.CVid = element.CVId;
                    CVVObj.Id = element.Id;
                    CVVObj.Rejected = element.Rejected;

                    CVsViewable.Add(CVVObj);
                }
            }

        }

        return Ok(CVsViewable);
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

    [HttpPost]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("downloadCVEmployer")]
    public async Task<ActionResult<Advert>> downloadCVEmployer(CVView cVView)
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = await _userManager.Users.Where(u => u.UserName == userName).FirstOrDefaultAsync();

        var CvCheck = await _context.CVView.Where(u => u.CVId == cVView.CVId).FirstOrDefaultAsync();

        if(CvCheck.AdvertAuthorId == user.Id)
        {
            var cv = await _context.CV.Where(u => u.Id == cVView.CVId).FirstOrDefaultAsync();

            MemoryStream ms = new MemoryStream(cv.userCV);

            return Ok(ms);
        }
        else
        {
            return BadRequest();
        }
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

    [HttpGet]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("getMyApplications")]
    public async Task<IActionResult> getApplications()
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = _userManager.Users.Where(u => u.UserName == userName).FirstOrDefault();

        var applications = await _context.CVView.ToListAsync();

        ApplicationsDTO MyApps = new ApplicationsDTO();

        List<ApplicationsDTO> MyAppsList = new List<ApplicationsDTO>();

        foreach (CVView element in applications)
        {
            if (element.Email == user.Email)
            {
                MyApps.Date = element.Date;
                MyApps.AdvertTitle = element.AdvertTitle;

                MyAppsList.Add(MyApps);
            }
        }
        
        return Ok(MyAppsList);
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
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("updateItem/{id}")]
    public async Task<IActionResult> putInfo(int id, Advert advert)
    {
        if (id != advert.Id)
        {
            return BadRequest();
        }

        var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var user = _userManager.Users.Where(u => u.UserName == userName).FirstOrDefault();

        advert.ApplicationUserId = user.Id;

        _context.Entry(advert).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return Ok(advert);
    }

    [HttpPatch]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("rejectApplicant/{id}")]
    public async Task<IActionResult> rejectApplicant(int id, [FromBody] JsonPatchDocument<CVView> patchEntity)
    {
        var applicant = await _context.CVView.FindAsync(id);

        if (applicant == null)
        {
            return NotFound();
        }

        patchEntity.ApplyTo(applicant, ModelState);

        _context.Entry(applicant).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return Ok(applicant);
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
