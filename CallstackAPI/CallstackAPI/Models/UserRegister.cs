using System;
using System.ComponentModel.DataAnnotations;

namespace CallstackAPI.Models
{
	public class UserRegister
	{
        public string RegisterEmail { get; set; }
        public string RegisterPassword { get; set; }
        public bool EmployerAccCheck { get; set; }
    }
}

