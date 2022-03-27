using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YonderfulApi.Data;
using YonderfulApi.Models;

namespace YonderfulApi.Service
{
	public class FutureEventsService : IFutureEventsService
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;

		public FutureEventsService(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<IList<Event>> GetFutureEventList()
		{
			var events = await _context.Events
				 .Where(x => (x.StartingDate >= DateTime.Now)).ToListAsync();
			return events;
		}
	}
}