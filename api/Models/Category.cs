using System.ComponentModel.DataAnnotations;
using System.Drawing;

namespace YonderfulApi.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public Image Icon { get; set; }
        public Image DefaultBackground { get; set; }

    }
}