using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class UserLoginDto
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        [RegularExpression("^[a-z]+\\.[a-z]+@tss-yonder\\.com", ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }

        [Required]
        [StringLength(255, ErrorMessage="Password must be between 5 and 255 characters!", MinimumLength = 5)]
        public string Password { get; set; }
    }
}