using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YonderfulApi.DTOs;
using YonderfulApi.Service;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly IMapper _mapper;

        public EventController(IEventService eventService, IMapper mapper)
        {
            _eventService = eventService;
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

        [HttpPost]
        public async Task<IActionResult> PostCategory(EventDto eventDto) 
        {   
            var newEvent = await _eventService.CreateEvent(eventDto);
            
            var createdEvent = await _eventService.PostEvent(newEvent);
            if(createdEvent == null) {
                return BadRequest();
            }
            return Ok(_mapper.Map<EventDto>(createdEvent));
        }
    }
}