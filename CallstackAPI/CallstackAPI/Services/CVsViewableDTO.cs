using System;
namespace CallstackAPI.Services
{
	public class CVsViewableDTO
	{
		public int Id { get; set; }
        public int CVid { get; set; }
        public DateTime Date { get; set; }
        public string FileNameType { get; set; }
        public string? AdvertTitle { get; set; }
        public int AdvertId { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string? SkillLevel { get; set; }
        public string? Education { get; set; }
        public bool Rejected { get; set; }
    }
}

