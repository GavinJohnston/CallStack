﻿using System;
using Microsoft.AspNetCore.Identity;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace CallstackAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() {
            Advert = new List<Advert>();
        }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? CompanyGroup { get; set; }
        public string? Website { get; set; }
        public string? SkillLevel { get; set; }
        public string? Education { get; set; }
        public List<Advert> Advert { get; set; }
    }
}

