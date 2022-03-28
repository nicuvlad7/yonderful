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
      var eventsList = from s in _context.MockEvents select s;
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
      if (param.Hidden != null)
      {
        eventsList = eventsList.Where(b => b.Hidden == placeHolder);
      }
      if (param.Category != null)
      {
        eventsList = eventsList.Where(b => b.Category == param.Category);
      }
      if (param.EndDate != null)
      {
        eventsList = eventsList.Where(b => b.StartDate > param.StartDate && b.EndDate < param.EndDate);
      }
      else
      {
        eventsList = eventsList.Where(b => b.StartDate < param.StartDate);
      }

      return await eventsList.ToListAsync();
    }
  }
}
