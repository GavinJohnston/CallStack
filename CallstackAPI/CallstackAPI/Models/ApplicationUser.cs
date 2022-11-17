using System;
using Microsoft.AspNetCore.Identity;

namespace CallstackAPI.Models
{
	public class ApplicationUser : IdentityUser
	{
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Website { get; set; }
        public string? SkillLevel { get; set; }
        public string? Education { get; set; }
    }
}

