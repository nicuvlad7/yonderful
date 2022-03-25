using System.ComponentModel.DataAnnotations;
using System.IO;
using System;
namespace YonderfulApi.DTOs
{
  public class MockFiltersDto
  {
    [Required]
    public DateTime StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }
    public String? Category { get; set; }
    public String? Hidden { get; set; }
  }
}