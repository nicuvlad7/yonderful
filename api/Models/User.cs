using System.ComponentModel.DataAnnotations;
using api.Models;

namespace YonderfulApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Role UserRole { get; set; } = Role.User;
        public string Email { get; set; }
        public string Password { get; set; }
    }
}