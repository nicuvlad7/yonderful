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
        Task<IList<Attendance>> GetEventsForUser(int UserId);
        Task<Attendance> PostAttendance(Attendance newAttendance);
        Task<Attendance> PutAttendance(Attendance attendanceToPut);
        Task<bool> DeleteAttendance(int EventId, int UserId);
    }
}