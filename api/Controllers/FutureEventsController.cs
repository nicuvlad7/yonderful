using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YonderfulApi.DTOs;
using YonderfulApi.Service;
using YonderfulApi.Models;
using System;
using System.ComponentModel.DataAnnotations;
using api.Service;

namespace YonderfulApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class FutureEventsController : ControllerBase
	{
		private readonly IFutureEventsService _futureEventsService;
		private readonly IEventService _eventService;
		private readonly IMapper _mapper;

		public FutureEventsController(IFutureEventsService futureEventsService, IEventService eventService, IMapper mapper)
		{
			_eventService = eventService;
			_futureEventsService = futureEventsService;
			_mapper = mapper;
		}


		[HttpGet]
		public async Task<IActionResult> GetFutureEvents()
		{
			var myEventList = await _futureEventsService.GetFutureEventList();
			var eventDtoList = _eventService.TransformEventDtoListForOutput(_mapper.Map<IList<EventDto>>(myEventList));
			return Ok(eventDtoList);
		}
	}
}