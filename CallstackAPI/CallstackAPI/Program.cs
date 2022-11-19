using CallstackAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var policyName = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName,
         builder =>
         {
             builder
               .AllowAnyOrigin() // specifying the allowed origin
               .AllowAnyMethod() // defining the allowed HTTP method
               .AllowAnyHeader(); // allowing any header to be sent
         });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'CallstackContextConnection' not found.");

builder.Services.AddDbContext<CallstackContext>(options =>
    options.UseSqlServer(connectionString)); 

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<CallstackContext>().AddDefaultUI()
            .AddDefaultTokenProviders();

builder.Services.AddControllersWithViews();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors(policyName);

app.UseAuthorization();

app.MapControllers();

app.MapRazorPages();

app.Run();

