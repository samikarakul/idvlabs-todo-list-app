namespace TodoApi.Models
{
    public class Todo
    {
        public int TodoId { get; set; }
        public string Title { get; set; }
        public string TodoContent { get; set; }
        public int UserId { get; set; }
        public bool IsCompleted { get; set; }
    }
}