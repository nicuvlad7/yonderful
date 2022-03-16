using System.ComponentModel.DataAnnotations;

namespace YonderfulApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        /// role == 0 - user
        /// role == 1 - admin
        /// by default 0
        public int Role { get; set; } = 0;
        public string Email { get; set; }
        public string Password { get; set; }
    }
}