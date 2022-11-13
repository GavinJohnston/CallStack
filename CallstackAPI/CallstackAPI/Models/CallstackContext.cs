using System;
using CallstackAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CallstackAPI.Models
{
    public class CallstackContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public CallstackContext(DbContextOptions<CallstackContext> options) : base(options)
        {
        }

        public DbSet<Advert> Advert { get; set; } = null!;
    }
}

