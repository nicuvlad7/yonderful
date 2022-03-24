using System.ComponentModel.DataAnnotations;
using System;

namespace YonderfulApi.Models
{
  public class MockEvent
  {
    [Key]
    public int Id { get; set; }
    public string Category { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public Boolean Hidden { get; set; }
  }
}
