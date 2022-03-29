using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YonderfulApi.DTOs;
using YonderfulApi.Service;

namespace YonderfulApi.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
    public class AttendanceController: ControllerBase
    {
        private readonly IAttendanceService _attendanceService;
        private readonly IMapper _mapper;

        public AttendanceController(IAttendanceService attendanceService){
            _attendanceService = attendanceService;
        }

        [HttpGet("{eventId}, {userId}")]
        public async Task<IActionResult> GetAttendance(int eventId, int userId){
            var attendance = await _attendanceService.GetAttendance(eventId, userId);
            if(attendance == null){
                return BadRequest("No attendace found");
            }
            return Ok(attendance);
        }

        [HttpGet("{eventId}")]
        public async Task<IActionResult> GetParticipants(int eventId){
            var attendance = await _attendanceService.GetParticipants(eventId);
            if(attendance == null){
                return BadRequest("No participants for event found");
            }
            return Ok(attendance);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetEventsForUser(int userId){
            var attendance = await _attendanceService.GetEventsForUser(userId);
            if(attendance == null){
                return BadRequest("No events for user found");
            }
            return Ok(attendance);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAttendance(){
            var attendance = await _attendanceService.GetAllAttendance();
            if(attendance == null){
                return BadRequest("No events for user found");
            }
            return Ok(attendance);
        }

        [HttpPost]
        public async Task<IActionResult> PostAttendance(AttendanceDto attendanceDto){
            return Ok();
        }
    }
}