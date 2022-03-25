using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
using System;
using YonderfulApi.DTOs;

namespace YonderfulApi.Service
{
  public interface IEventFiltersService
  {
    Task<IList<MockEvent>> FilterEvents(MockFiltersDto param);
  }
}

