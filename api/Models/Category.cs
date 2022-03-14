using System.ComponentModel.DataAnnotations;
using System.IO; 

namespace YonderfulApi.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public MemoryStream Icon { get; set; }
        public MemoryStream DefaultBackground { get; set; }

    }
}