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


  
    [HttpGet("end-date")]
    public async Task<IActionResult> GetEventsByEndDate(DateTime param)
    {
      var eventList = await _eventFiltersService.FilterByEndDate(param);
      if (eventList == null)
      {
        return NotFound();
      }

      return Ok(eventList);
    }

    [HttpGet("start-date")]
    public async Task<IActionResult> GetEventsByStartDate(DateTime param)
    {
      var eventList = await _eventFiltersService.FilterByEndDate(param);
      if (eventList == null)
      {
        return NotFound();
      }
      return Ok(eventList);
    }

    [HttpGet("has-category")]
    public async Task<IActionResult> GetEventsByCategory(string param)
    {
      var eventList = await _eventFiltersService.FilterByCategory(param);
      if (eventList == null)
      {
        return NotFound();
      }

      return Ok(eventList);
    }

    [HttpGet("is-hidden")]
    public async Task<IActionResult> GetEventsByHidden(Boolean param)
    {
      var eventList = await _eventFiltersService.FilterByHidden(param);
      if (eventList == null)
      {
        return NotFound();
      }

      return Ok(eventList);
    }

  }
}
