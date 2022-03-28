using AutoMapper;
using YonderfulApi.DTOs;
using YonderfulApi.Migrations;

namespace api.Mappings
{
    public class AttendanceMappings: Profile
    {
        public AttendanceMappings()
		{
			// source -> target
			CreateMap<Attendance, AttendanceDto>();
			CreateMap<AttendanceDto, Attendance>();
		}
    }
}