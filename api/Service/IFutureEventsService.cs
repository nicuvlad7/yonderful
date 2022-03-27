using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YonderfulApi.Models;

namespace YonderfulApi.Service
{
	public interface IFutureEventsService
	{
		Task<IList<Event>> GetFutureEventList();
	}
}