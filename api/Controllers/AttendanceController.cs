using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YonderfulApi.DTOs;
using YonderfulApi.Models;
using YonderfulApi.Service;

namespace YonderfulApi.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
    public class AttendanceController: ControllerBase
    {
        private readonly IAttendanceService _attendanceService;
        private readonly IMapper _mapper;

        public AttendanceController(IAttendanceService attendanceService, IMapper mapper){
            _attendanceService = attendanceService;
            _mapper = mapper;
        }

        [HttpGet("{eventId}, {userId}")]
        public async Task<IActionResult> GetAttendance(int eventId, int userId){
            var attendance = await _attendanceService.GetAttendance(eventId, userId);
            if(attendance == null){
                return BadRequest("No attendace found");
            }
            return Ok(_mapper.Map<AttendanceDto>(attendance));
        }

        [HttpGet("[action]/{eventId}")]
        public async Task<IActionResult> GetParticipants(int eventId){
            var attendance = await _attendanceService.GetParticipants(eventId);
            if(attendance == null){
                return BadRequest("No participants for event found");
            }
            return Ok(_mapper.Map<IList<AttendanceDto>>(attendance));
        }

        [HttpGet("[action]/{userId}")]
        public async Task<IActionResult> GetEventsForUser(int userId){
            var attendance = await _attendanceService.GetEventsForUser(userId);
            if(attendance == null){
                return BadRequest("No events for user found");
            }
            return Ok(_mapper.Map<IList<AttendanceDto>>(attendance));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAttendance(){
            var attendance = await _attendanceService.GetAllAttendance();
            if(attendance == null){
                return BadRequest("No events for user found");
            }
            return Ok(_mapper.Map<IList<AttendanceDto>>(attendance));
        }

        [HttpPost]
        public async Task<IActionResult> PostAttendance(AttendanceDto attendanceDto){
            var newAttendance = await _attendanceService.PostAttendance(_mapper.Map<Attendance>(attendanceDto));
            if(newAttendance == null){
                return BadRequest();
            }
            return Ok(_mapper.Map<AttendanceDto>(newAttendance));
        }

        [HttpPut]
        public async Task<IActionResult> PutAttendance(AttendanceDto attendanceDto){
			var putAttendance = await _attendanceService.PutAttendance(_mapper.Map<Attendance>(attendanceDto));
			if (putAttendance == null)
			{
				return BadRequest();
			}
			return Ok(putAttendance);
        }

        [HttpDelete("{eventId}, {userId}")]
        public async Task<IActionResult> DeleteAttendance(int eventId, int userId){
            var deletedAttendance = await _attendanceService.DeleteAttendance(eventId, userId);
			return deletedAttendance ? Ok() : BadRequest();
        }
    }
}