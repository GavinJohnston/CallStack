using CallstackAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false)
    .Build();

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

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true).AddRoles<IdentityRole>().AddEntityFrameworkStores<CallstackContext>().AddDefaultUI()
            .AddDefaultTokenProviders();

builder.Services.AddControllersWithViews().AddNewtonsoftJson();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

var jwtSettings = config.GetSection("Jwt");

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options => {

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,

        ValidateAudience = false,

        ValidateLifetime = true,

        ValidateIssuerSigningKey = true,

        ValidIssuer = jwtSettings.GetSection("Issuer").Value,

        ValidAudience = jwtSettings.GetSection("Audience").Value,

        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.GetSection("Key").Value))
    };
});


builder.Services.AddAuthorization();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors(policyName);

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

app.MapRazorPages();

app.Run();

