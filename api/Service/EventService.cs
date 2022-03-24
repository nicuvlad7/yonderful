using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Data;
using YonderfulApi.Models;
using YonderfulApi.DTOs;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace YonderfulApi.Service
{
  public class EventService : IEventService
  {
    private readonly DataContext _context;
    private readonly IPictureService _pictureService;
    private readonly ILocationService _locationService;
    private readonly IMapper _mapper;

    public EventService(DataContext context, IPictureService pictureService, ILocationService locationService, IMapper mapper) {
        _context = context;
        _pictureService = pictureService;
        _locationService = locationService;
        _mapper = mapper;
    }

    public async Task<Event> CreateEvent(EventDto eventDto)
    {
        Event newEvent = new Event{
            CategoryId = eventDto.CategoryId,
            HostId = eventDto.HostId,
            Title = eventDto.Title,
            StartingDate = eventDto.StartingDate,
            EndingDate = eventDto.EndingDate,
            MinimumParticipants = eventDto.MinimumParticipants,
            MaximumParticipants = eventDto.MaximumParticipants,
            Autocancel = eventDto.Autocancel,
            AutoJoin = eventDto.AutoJoin,
            JoinDeadline = eventDto.JoinDeadline,
            Fee = eventDto.Fee,
            Description = eventDto.Description,
            EventLocation = _mapper.Map<Location>(eventDto.EventLocation),
            ContactEmail = eventDto.ContactEmail,
            ContactPhone = eventDto.ContactPhone,
            Tags = string.Join(" ", eventDto.Tags),
            BackgroundId = await _pictureService.CreatePictureByContent(eventDto.BackgroundImage)
        };
        return newEvent;
    }

    public async Task<bool> DeleteEvent(int eventID)
    {
        var myEvent = await _context.Events.FindAsync(eventID);
        if(myEvent == null) {
            return false;
        }
        _context.Events.Remove(myEvent);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IList<Event>> GetEventList()
    {
        var events = await _context.Events.ToListAsync();
        return events;
    }

    public async Task<Event> GetEvent(int id)
    {
        var myEvent = await _context.Events.FindAsync(id);
        return myEvent;
    }

    public async Task<Event> PostEvent(Event newEvent)
    {
        if (await EventExists(newEvent)) return null;

        _context.Events.Add(newEvent);
        await _context.SaveChangesAsync();
        return newEvent;
    }

    public async Task<Event> PutEvent(int eventID, Event eventToPut)
    {
        var myEvent = await _context.Events.FindAsync(eventID);
        if(myEvent == null) {
            return null;
        }
        myEvent = eventToPut;

        _context.Events.Update(myEvent);
        await _context.SaveChangesAsync();
        return myEvent;
    }

    public async Task<EventDto> TransformEventDtoForOutput(EventDto eventDto)
    {
        if(eventDto != null){
            eventDto.BackgroundImage = await _pictureService.GetPictureContent(eventDto.BackgroundImage);
        }
        return eventDto;
    }

    public async Task<IList<EventDto>> TransformEventDtoListForOutput(IList<EventDto> eventDtoList)
    {
        IList<EventDto> outputList = new List<EventDto>();
        foreach(EventDto eventDto in eventDtoList) {
            outputList.Add(await TransformEventDtoForOutput(eventDto));
        }
        return outputList;
    }

    private async Task<bool> EventExists(Event myEvent)
    {
        return await _context.Events.AnyAsync(existingEvent => existingEvent.Id == myEvent.Id);
    }
  }
}