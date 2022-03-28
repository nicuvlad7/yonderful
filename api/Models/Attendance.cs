using System;

namespace YonderfulApi.Models
{
    public class Attendance
    {
        public int EvenimentId { get; set; }
        public Event Eveniment { get; set; }
        public int ParticipantId { get; set; }
        public User Participant { get; set; }
        public DateTime JoiningDate { get; set; }

    }
}