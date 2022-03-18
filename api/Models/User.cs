using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  public class User
  {
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public Role UserRole { get; set; } = Role.User;
    public string Email { get; set; }
    public string Password { get; set; }
    public string Position { get; set; }
    [StringLength(10)]
    public string PhoneNo { get; set; }
  }
}