using System.ComponentModel.DataAnnotations;

namespace YonderfulApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Role { get; set; } = 0;
        public string Email { get; set; }
        public string Password { get; set; }
    }
}