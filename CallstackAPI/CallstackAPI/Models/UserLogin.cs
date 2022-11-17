using System;
namespace CallstackAPI.Models
{
	public class UserLogin
	{
        public string LoginEmail { get; set; }
        public string LoginPassword { get; set; }
        public bool RememberMe { get; set; } = false;
    }
}

