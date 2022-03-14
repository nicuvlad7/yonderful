using System.ComponentModel.DataAnnotations;

namespace YonderfulApi.DTOs
{
    public class EmployeeDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
    }
}