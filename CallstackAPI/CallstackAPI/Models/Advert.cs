using System;
namespace CallstackAPI.Models
{
    public class Advert
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.Now.Date.ToLocalTime();
        public string? Title { get; set; }
        public string? Company { get; set; }
        public string? Location { get; set; }
        public string? Country { get; set; }
        public int Salary { get; set; }
        public string? JobType { get; set; }
        public string? onSite { get; set; }
        public string? Benefits { get; set; }
        public string? DescShort { get; set; }
        public string? DescriptionArea { get; set; }
        public bool isApproved { get; set; } = false;
    }
}

