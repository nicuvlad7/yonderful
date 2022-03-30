using System;
using System.ComponentModel.DataAnnotations;
using YonderfulApi.DTOs;

namespace YonderfulApi.DTOs
{
    public class AttendanceDto
    {
        [Required]
        public int EvenimentId { get; set; }
        [Required]
        public int ParticipantId { get; set; }
        [Required]
        public DateTime JoiningDate { get; set; }
        
    }
}