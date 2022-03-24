using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
using System;

namespace YonderfulApi.Service
{
  public interface IEventFiltersService
  {
    Task<IList<MockEvent>> FilterByEndDate(DateTime param);
    Task<IList<MockEvent>> FilterByStartDate(DateTime param);
    Task<IList<MockEvent>> FilterByCategory(String param);
    Task<IList<MockEvent>> FilterByHidden(Boolean param);

  }
}

