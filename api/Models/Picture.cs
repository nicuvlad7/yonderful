using System.ComponentModel.DataAnnotations;


namespace YonderfulApi.Models
{
    public class Picture
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string FileType { get; set; }
        public byte[] Content { get; set; }
    }
}