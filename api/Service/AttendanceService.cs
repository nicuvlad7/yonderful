using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YonderfulApi.Data;
using YonderfulApi.Models;
using YonderfulApi.Service;
using System.Linq;

namespace api.Service
{
	public class AttendanceService : IAttendanceService
	{
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AttendanceService(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<bool> DeleteAttendance(int EventId, int UserId)
		{
			var attendance = await _context.Attendance
									.Include(att => att.Participant)
									.Include(att => att.Eveniment)
									.FirstOrDefaultAsync(att => att.EvenimentId == EventId && att.ParticipantId == UserId);
			if (attendance == null)
			{
				return false;
			}
			_context.Attendance.Remove(attendance);
			return await _context.SaveChangesAsync() > 0;
		}

		public async Task<IList<Attendance>> GetAllAttendance()
		{
			var attendanceList = await _context.Attendance.Include(i => i.Participant).Include(i => i.Eveniment).ToListAsync();
            return attendanceList;
		}

		public async Task<Attendance> GetAttendance(int EventId, int UserId)
		{
			var attendance = await _context.Attendance
									.Include(i => i.Participant)
									.Include(i => i.Eveniment)
									.FirstOrDefaultAsync(att => att.EvenimentId == EventId && att.ParticipantId == UserId);
			return attendance;
		}

		public async Task<IList<Attendance>> GetEventsForUser(int UserId)
		{
			var attendance = await _context.Attendance
									.Where(att => att.ParticipantId == UserId)
									.Include(i => i.Participant)
									.Include(i => i.Eveniment)
									.ToListAsync();
			return attendance;
		}

		public async Task<IList<Attendance>> GetParticipants(int EventId)
		{
			var attendance = await _context.Attendance
									.Where(att => att.EvenimentId == EventId)
									.Include(i => i.Participant)
									.Include(i => i.Eveniment)
									.ToListAsync();
			return attendance;
		}

		public async Task<Attendance> PostAttendance(Attendance newAttendance)
		{
			var existingAttendance = await GetAttendance(newAttendance.EvenimentId, newAttendance.ParticipantId);
			if(existingAttendance != null)
				return null;
			_context.Attendance.Add(newAttendance);
			await _context.SaveChangesAsync();
			return newAttendance;
		}

		public async Task<Attendance> PutAttendance(Attendance attendanceToPut)
		{
			var existingAttendance = await GetAttendance(attendanceToPut.EvenimentId, attendanceToPut.ParticipantId);
			if(existingAttendance == null)
				return null;
			existingAttendance.Eveniment = attendanceToPut.Eveniment;
			existingAttendance.Participant = attendanceToPut.Participant;
			existingAttendance.JoiningDate = attendanceToPut.JoiningDate;
			_context.Attendance.Update(existingAttendance);
			await _context.SaveChangesAsync();
			return existingAttendance;
		}
	}
}