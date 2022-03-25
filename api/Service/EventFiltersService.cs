using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
using YonderfulApi.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using YonderfulApi.DTOs;
namespace YonderfulApi.Service
{

  public class EventFiltersService : IEventFiltersService
  {
    private readonly DataContext _context;
    public EventFiltersService(DataContext context)
    {
      _context = context;
    }


    public async Task<IList<MockEvent>> FilterEvents(MockFiltersDto param)
    {
      var eventsList = await _context.MockEvents.ToListAsync();
      var test = Convert.ToDateTime(param.StartDate);
      bool placeHolder = true;
      if (param.Hidden != null)
      {
        if (param.Hidden == "true")
        {
          placeHolder = true;
        }
        else
        {
          placeHolder = false;
        }
      }

      if (param.EndDate != null && param.Category != null && param.Hidden != null)
      {
        eventsList = await _context.MockEvents
         .Where(b => (b.StartDate >= param.StartDate && b.EndDate <= param.EndDate)).Where(b => b.Hidden == placeHolder).Where(b => b.Category == param.Category)
        .ToListAsync();
      }

      if (param.EndDate == null && param.Category != null && param.Hidden != null)
      {
        eventsList = await _context.MockEvents
         .Where(b => (b.StartDate >= param.StartDate)).Where(b => b.Hidden == placeHolder).Where(b => b.Category == param.Category)
        .ToListAsync();
      }

      if (param.EndDate == null && param.Category == null && param.Hidden != null)
      {
        eventsList = await _context.MockEvents
         .Where(b => (b.StartDate >= param.StartDate)).Where(b => b.Hidden == placeHolder)
        .ToListAsync();
      }

      if (param.EndDate == null && param.Category == null && param.Hidden == null)
      {
        eventsList = await _context.MockEvents
         .Where(b => b.StartDate >=test)
        .ToListAsync();
      }

      if (param.EndDate != null && param.Category == null && param.Hidden != null)
      {
        eventsList = await _context.MockEvents
         .Where(b => (b.StartDate >= param.StartDate && b.EndDate <= param.EndDate)).Where(b => b.Hidden == placeHolder)
        .ToListAsync();
      }

      if (param.EndDate != null && param.Category == null && param.Hidden == null)
      {
        eventsList = await _context.MockEvents
         .Where(b => (b.StartDate >= param.EndDate && b.EndDate <= param.StartDate))
        .ToListAsync();
      }

      if (param.EndDate != null && param.Category != null && param.Hidden == null)
      {
        eventsList = await _context.MockEvents
         .Where(b => (b.StartDate >= param.StartDate && b.EndDate <= param.EndDate)).Where(b => b.Category == param.Category)
        .ToListAsync();
      }

      if (param.EndDate == null && param.Category != null && param.Hidden == null)
      {
        eventsList = await _context.MockEvents
         .Where(b => (b.StartDate >= param.StartDate)).Where(b => b.Category == param.Category)
        .ToListAsync();
      }
      return eventsList;
    }

  }
}
