using System.ComponentModel.DataAnnotations;
using System;
namespace YonderfulApi.DTOs
{
	public class FiltersDto
	{
		[Required]
		public DateTime StartingDate { get; set; }
		public DateTime? EndingDate { get; set; }
		public string[] Categories { get; set; }
		public bool? HiddenIfFee { get; set; }
		public bool? HiddenIfStarted { get; set; }
		public int? IsHostId { get; set; }
		public int? IsAttendingId { get; set; }
		public string SearchTitle { get; set; }
	}
}
