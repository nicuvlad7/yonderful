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
    public async Task<int> createLocationFromString(string location)
    {
        var locationInfo = location.Split("*");
        Location newLocation = new Location{
          Street = locationInfo[0],
          Address = locationInfo[1],
          City = locationInfo[2],
          Province = locationInfo[3]
        };
        var existingLocation = await GetLocation(newLocation);
        if(existingLocation == null){
          newLocation = await PostLocation(newLocation);
          return newLocation.Id;
        }
        return existingLocation.Id;
    }

    private async Task<Location> GetLocation(Location location){
      var locationList = await GetLocationList();
      foreach(Location loc in locationList){
        if(location.Street.ToLower() == loc.Street.ToLower() && location.Address.ToLower() == loc.Address.ToLower()){
          if(location.City.ToLower() == loc.City.ToLower() && location.Province.ToLower() == loc.Province.ToLower()){
            return loc;
          }
        }
      }
      return null;
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

    public async Task<string> getLocationContent(string locationStrId){
      var location = await GetLocation(Int32.Parse(locationStrId));
      return location.Street+"*"+location.Address+"*"+location.City+"*"+location.Province;
    }
  }
}