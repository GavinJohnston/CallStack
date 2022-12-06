using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using CallstackAPI.Services;

namespace CallstackAPI.Models
{
	public class CV
	{
		public int Id { get; set; }
        public byte[] userCV { get; set; }
        public DateTime Date { get; set; } = DateTime.Now.Date.ToLocalTime();
        public string? ApplicationUserId { get; set; }
    }
}

