using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YonderfulApi.DTOs;
using YonderfulApi.Models;
using YonderfulApi.Service;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly IUserService _userService;
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public EventController(IEventService eventService, ICategoryService categoryService, IUserService userService, IMapper mapper)
        {
            _eventService = eventService;
            _categoryService = categoryService;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet("{eventId}")]
        public async Task<IActionResult> GetEvent(int eventId)
        {
            var myEvent = await _eventService.GetEvent(eventId);
            if(myEvent == null) {
                return NotFound("Event with id given not found");
            }
            var eventDto = _eventService.TransformEventDtoForOutput(_mapper.Map<EventDto>(myEvent));
            return Ok(eventDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var myEventList = await _eventService.GetEventList();
            var eventDtoList = _eventService.TransformEventDtoListForOutput(_mapper.Map<IList<EventDto>>(myEventList));
            return Ok(eventDtoList);
        }

        //Restrictions:
        //X1. Category should exist 
        //X2. HostId should be valid
        //X3. Starting date < Ending date
        //X4. Minimum participants < Maximum participants
        //X5. JoinDeadline < starting date
        //X6. Fee > 0
        //x7. Contact email valid(exemple@exemple.com)
        //x8. Contact phone valid exactly 10 digits or 14
        //9. There should be max 5 tags
        [HttpPost]
        public async Task<IActionResult> PostEvent(EventDto eventDto) 
        {   
            var newEvent = await _eventService.CreateEvent(eventDto);

            var existingCategory = await _categoryService.GetCategory(newEvent.CategoryId);
            var existingUser = await _userService.GetUserById(newEvent.HostId);

            if(existingCategory == null)
                return BadRequest("Category doesn't exist.");
            if(existingUser == null)
                return BadRequest("Host doesn't exist.");
            if(newEvent.StartingDate >= newEvent.EndingDate)
                return BadRequest("Starting date should be before ending date.");
            if(newEvent.StartingDate < newEvent.JoinDeadline)
                return BadRequest("Joining deadline should be before starting date.");
            if(newEvent.MinimumParticipants > newEvent.MaximumParticipants)
                return BadRequest("Minimum number of participants should be lower than the maximum one.");
            if(newEvent.Tags.Split("*").Length > 5)
                return BadRequest("Maximum 5 tags are allowed");
            
            var createdEvent = await _eventService.PostEvent(newEvent);
            if(createdEvent == null) {
                return BadRequest();
            }
            return Ok(_mapper.Map<EventDto>(createdEvent));
        }

        [HttpDelete("{eventId}")]
        public async Task<IActionResult> DeleteEvent(int eventId){
            var deletedEvent = await _eventService.DeleteEvent(eventId);
            return deletedEvent ? Ok() : BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> PutElement(EventDto newEventDto){
            var newEvent = await _eventService.CreateEvent(newEventDto);
            var putEvent = await _eventService.PutEvent(newEvent);
            if(putEvent == null){
                return BadRequest();
            }
            return Ok(putEvent);
        }
    }
}