using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.DTOs
{
  public class UserDto
  {
    [Required]
    public string Name { get; set; }
    [Required]
    [EmailAddress(ErrorMessage = "Invalid Email Address")]
    [RegularExpression("^[a-zA-Z0-9_\\.-]+@tss-yonder.com", ErrorMessage = "E-mail is not valid")]
    public string Email { get; set; }
    [Required]
    [StringLength(255, ErrorMessage = "Password must be between 5 and 255 characters!", MinimumLength = 5)]
    public string Password { get; set; }
    public Role Role { get; set; }
    public string Position { get; set; }
    [StringLength(10)]
    public string PhoneNo { get; set; }
  }
}