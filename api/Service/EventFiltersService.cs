using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
using YonderfulApi.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
namespace YonderfulApi.Service
{

  public class EventFiltersService : IEventFiltersService
  {
    private readonly DataContext _context;
    public EventFiltersService(DataContext context )
    {
      _context = context;
    }

    
    public async Task<IList<MockEvent>> FilterByEndDate(DateTime param)
    {
      var eventsList = await _context.MockEvents
      .Where(b => b.EndDate < param)
      .ToListAsync();
      return eventsList;
    }
    public async Task<IList<MockEvent>> FilterByStartDate(DateTime param)
    {
      var eventsList = await _context.MockEvents
      .Where(b => b.StartDate < param)
      .ToListAsync();
      return eventsList;
    }
    public async Task<IList<MockEvent>> FilterByCategory(String param)
    {
      var eventsList = await _context.MockEvents
      .Where(b => b.Category == param)
      .ToListAsync();
      return eventsList;
    }
    public async Task<IList<MockEvent>> FilterByHidden(Boolean param)
    {
      var eventsList = await _context.MockEvents
      .Where(b => b.Hidden == param)
      .ToListAsync();
      return eventsList;
    }
  }
}
