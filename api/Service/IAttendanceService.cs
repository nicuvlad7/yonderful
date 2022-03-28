using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;

namespace YonderfulApi.Service
{
    public interface IAttendanceService
    {
        Task<Attendance> GetAttendance(int EventId, int UserId);
        Task<IList<Attendance>> GetAllAttendance();
        Task<IList<Attendance>> GetParticipants(int EventId);
        Task<IList<Attendance>> GetEvents(int UserId);
        Task<Attendance> PostAttendance(Event myEvent, User user);
        Task<Attendance> PutAttendance(Attendance newAttendance);
        Task<bool> DeleteAttendance(Event myEvent, User user);
    }
}