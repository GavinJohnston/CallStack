using System.IO;
using CallstackAPI.Models;
//using CallstackAPI.Services;
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


    public CallstackController(CallstackContext context,
                UserManager<ApplicationUser> userManager,
                IUserStore<ApplicationUser> userStore,
                SignInManager<ApplicationUser> signInManager,
                IEmailSender emailSender)
    {
        _context = context;
        _userManager = userManager;
        _userStore = userStore;
        _emailStore = GetEmailStore();
        _signInManager = signInManager;
        _emailSender = emailSender;
    }

    [HttpPost]
    [Route("Register")]
    public async Task<ActionResult> RegisterUser(UserRegister userRegister)
    {

        var user = CreateUser();

        await _userStore.SetUserNameAsync(user, userRegister.RegisterEmail, CancellationToken.None);
        await _emailStore.SetEmailAsync(user, userRegister.RegisterEmail, CancellationToken.None);
        var result = await _userManager.CreateAsync(user, userRegister.RegisterPassword);

        return Ok(result);
    }

    [HttpPost]
    [Route("Login")]
    public async Task<ActionResult> LoginUser(UserLogin userLogin)
    {
        var result = await _signInManager.PasswordSignInAsync(userLogin.LoginEmail, userLogin.LoginPassword, userLogin.RememberMe, lockoutOnFailure: false);

        return Ok(result);
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

    [HttpPost]
    [Route("PostAdvert")]
    public async Task<ActionResult<Advert>> postInfo(Advert advert)
    {
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

    [HttpGet]
    [Route("Profile")]
    public async Task<IActionResult> getProfile()
    {
        var user = await _userManager.GetUserAsync(User);

        return Ok(User);
    }
}

