using System.ComponentModel.DataAnnotations;
using System;
namespace YonderfulApi.DTOs
{
  public class FiltersDto
  {
    [Required]
    public DateTime StartingDate { get; set; }
    
    public DateTime? EndingDate { get; set; }
    public int? CategoryId { get; set; }
  }
}