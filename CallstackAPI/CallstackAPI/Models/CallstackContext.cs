using System;
using System.Reflection.Emit;
using CallstackAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CallstackAPI.Models
{
    public class CallstackContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public CallstackContext(DbContextOptions<CallstackContext> options) : base(options)
        {
        }

        public DbSet<Advert> Advert { get; set; } = null!;
        public DbSet<Bookmarks> Bookmarks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.HasDefaultSchema("Identity");
            builder.ApplyConfiguration(new RoleConfiguration());
            builder.Entity<IdentityUserRole<string>>().HasKey(p => new { p.UserId, p.RoleId });
            builder.Entity<ApplicationUser>(entity =>
            {
                entity.ToTable(name: "User");
            });
            builder.Entity<IdentityRole>(entity =>
            {
                entity.ToTable(name: "Role");
            });
            builder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.ToTable("UserRoles");
            });
            builder.Entity<IdentityUserClaim<string>>(entity =>
            {
                entity.ToTable("UserClaims");
            });
            builder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.ToTable("UserLogins");
            });
            builder.Entity<IdentityRoleClaim<string>>(entity =>
            {
                entity.ToTable("RoleClaims");
            });
            builder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.ToTable("UserTokens");
            });
        }

    }

}

