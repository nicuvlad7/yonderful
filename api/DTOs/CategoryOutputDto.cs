using System.ComponentModel.DataAnnotations;
using System.IO; 
namespace YonderfulApi.DTOs
{
    public class CategoryOutputDto
    {
    
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Icon { get; set; }
        [Required]
        public string DefaultBackground { get; set; }

    }
}