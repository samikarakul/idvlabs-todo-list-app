namespace TodoApi.Models
{
    public class Response
    {
        public bool Error { get; set; }
        public string? ErrorMessage { get; set; }
        public bool Success { get; set; }

        public string? ResponseValue { get; set; }
    }
}