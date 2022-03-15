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

        public string Email { get; set; }
        public string Name { get; set; }
        public Role Role { get; set; }

        [StringLength(10)]
        public string PhoneNo { get; set; }
    }
}