using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YonderfulApi.DTOs;
using YonderfulApi.Service;
using YonderfulApi.Models;
using System;
using System.ComponentModel.DataAnnotations;


namespace YonderfulApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EventFiltersController : ControllerBase
  {
    private readonly IEventFiltersService _eventFiltersService;
    private readonly IMapper _mapper;

    public EventFiltersController(IEventFiltersService eventFiltersService, IMapper mapper)
    {
      _eventFiltersService = eventFiltersService;
      _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> ApplyAllFilters(MockFiltersDto param)
    {
      var eventList = await _eventFiltersService.FilterEvents(param);
      if(eventList == null){
        return NotFound();
      }
      return Ok(eventList);
    }

  }
}
