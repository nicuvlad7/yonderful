using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YonderfulApi.Service;

namespace YonderfulApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController: ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetLocations()
        {
            var myLocationList = await _locationService.GetLocationList();
            return Ok(myLocationList);
        }

    }
}