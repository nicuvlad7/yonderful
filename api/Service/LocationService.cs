using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YonderfulApi.Data;
using YonderfulApi.Models;

namespace YonderfulApi.Service
{
  public class LocationService : ILocationService
  {
    private readonly DataContext _context;

    public LocationService(DataContext context) {
        _context = context;
    }

    public async Task<bool> DeleteLocation(int locationId)
    {
      var location = await _context.Location.FindAsync(locationId);
      if(location == null)
        return false;
      _context.Location.Remove(location);
      return await _context.SaveChangesAsync() > 0;
    }

    public async Task<Location> GetLocation(int locationId)
    {
      var location = await _context.Location.FindAsync(locationId);
      return location;
    }

    public async Task<IList<Location>> GetLocationList()
    {
      var locations = await _context.Location.ToListAsync();
      return locations;
    }

    public async Task<Location> PostLocation(Location newLocation)
    {
      if (await LocationExists(newLocation)) return null;

      _context.Location.Add(newLocation);
      await _context.SaveChangesAsync();
      return newLocation;
    }

    public async Task<Location> PutLocation(int locationID, Location locationToPut)
    {
        var location = await _context.Location.FindAsync(locationID);
        if(location == null) {
            return null;
        }
        location = locationToPut;

        _context.Location.Update(location);
        await _context.SaveChangesAsync();
        return location;
    }

    private async Task<bool> LocationExists(Location newLocation){
      return await _context.Location.AnyAsync(location => location.Id == newLocation.Id);
    }

  }
}