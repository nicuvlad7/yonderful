using System;
using System.ComponentModel.DataAnnotations;
using api.DTOs;
using YonderfulApi.Models;

namespace YonderfulApi.DTOs
{
	public class EventDto
	{
		[Required]
		public int Id { get; set; }
		[Required]
		public int CategoryId { get; set; }
		[Required]
		public int HostId { get; set; }
		[Required]
		public string Title { get; set; }
		[Required]
		public DateTime StartingDate { get; set; }
		[Required]
		public DateTime EndingDate { get; set; }
		public int MinimumParticipants { get; set; }
		public int MaximumParticipants { get; set; }
		public bool AutoCancel { get; set; }
		public bool AutoJoin { get; set; }
		[Required]
		public DateTime JoinDeadline { get; set; }
		[Required]
		public int Fee { get; set; }
		[Required]
		public string Description { get; set; }
		[Required]
		public LocationDto EventLocation { get; set; }
		[Required]
		public string ContactEmail { get; set; }
		[Required]
		public string ContactPhone { get; set; }
		public string Tags { get; set; }
		[Required]
		public string BackgroundImage { get; set; }
	}
}