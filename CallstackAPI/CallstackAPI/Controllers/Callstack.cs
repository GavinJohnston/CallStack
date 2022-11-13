using System.IO;
using CallstackAPI.Models;
using CallstackAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CallstackAPI.Controllers;

[ApiController]
[Route("")]
public class CallstackController : ControllerBase
{

    private readonly CallstackContext _context;
    private readonly IdentityLoginService _IdentityLoginService;
    private readonly IdentityRegisterService _IdentityRegisterService;

    public CallstackController(CallstackContext context, IdentityLoginService identityLoginService, IdentityRegisterService identityRegisterService)
    {
        _context = context;
        _IdentityLoginService = identityLoginService;
        _IdentityRegisterService = identityRegisterService;
    }

    [HttpPost]
    [Route("Login")]
    public async Task<ActionResult> userLogin(UserLogin userLogin)
    {
        await _IdentityLoginService.LoginModel.OnPostAsync(userLogin);

        return Ok();
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
}

