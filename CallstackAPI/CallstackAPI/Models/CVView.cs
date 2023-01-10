using System;
namespace CallstackAPI.Models
{
	public class CVView
	{
		public int Id { get; set; }
		public int CVId { get; set; }
		public int AdvertId { get; set; }
		public string? AdvertTitle { get; set; }
        public string? AdvertAuthorId { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string? SkillLevel { get; set; }
        public string? Education { get; set; }
        public bool Rejected { get; set; }
        public DateTime Date { get; set; } = DateTime.Now.Date.ToLocalTime();
    }
}

