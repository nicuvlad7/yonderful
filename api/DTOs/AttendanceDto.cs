using System;
using System.ComponentModel.DataAnnotations;
using YonderfulApi.DTOs;

namespace YonderfulApi.DTOs
{
    public class AttendanceDto
    {
        [Required]
        public EventDto Eveniment { get; set; }
        [Required]
        public UserDetailsDto Participant { get; set; }
        [Required]
        public DateTime JoiningDate { get; set; }
        
    }
}