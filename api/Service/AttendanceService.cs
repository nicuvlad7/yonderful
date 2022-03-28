using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YonderfulApi.Data;
using YonderfulApi.Models;
using YonderfulApi.Service;

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

		public Task<bool> DeleteAttendance(Event myEvent, User user)
		{
			throw new System.NotImplementedException();
		}

		public async Task<IList<Attendance>> GetAllAttendance()
		{
			var attendance = await _context.Attendance.Include(i => i.Participant).Include(i => i.Eveniment).ToListAsync();
            return attendance;
		}

		public Task<Attendance> GetAttendance(int EventId, int UserId)
		{
			throw new System.NotImplementedException();
		}

		public Task<IList<Attendance>> GetEvents(int UserId)
		{
			throw new System.NotImplementedException();
		}

		public Task<IList<Attendance>> GetParticipants(int EventId)
		{
			throw new System.NotImplementedException();
		}

		public Task<Attendance> PostAttendance(Event myEvent, User user)
		{
			throw new System.NotImplementedException();
		}

		public Task<Attendance> PutAttendance(Attendance newAttendance)
		{
			throw new System.NotImplementedException();
		}
	}
}