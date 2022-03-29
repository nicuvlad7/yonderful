using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Data;
using YonderfulApi.Models;
using YonderfulApi.DTOs;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Linq;
using System;

namespace YonderfulApi.Service
{
	public class EventService : IEventService
	{
		private readonly DataContext _context;
		private readonly IPictureService _pictureService;
		private readonly ILocationService _locationService;
		private readonly IMapper _mapper;

		public EventService(DataContext context, IPictureService pictureService, ILocationService locationService, IMapper mapper)
		{
			_context = context;
			_pictureService = pictureService;
			_locationService = locationService;
			_mapper = mapper;
		}

		public async Task<Event> CreateEvent(EventDto eventDto)
		{
			Event newEvent = new Event
			{
				Id = eventDto.Id,
				CategoryId = eventDto.CategoryId,
				HostId = eventDto.HostId,
				Title = eventDto.Title,
				StartingDate = eventDto.StartingDate,
				EndingDate = eventDto.EndingDate,
				MinimumParticipants = eventDto.MinimumParticipants,
				MaximumParticipants = eventDto.MaximumParticipants,
				AutoCancel = eventDto.AutoCancel,
				AutoJoin = eventDto.AutoJoin,
				JoinDeadline = eventDto.JoinDeadline,
				Fee = eventDto.Fee,
				Description = eventDto.Description,
				EventLocation = _mapper.Map<Location>(eventDto.EventLocation),
				ContactEmail = eventDto.ContactEmail,
				ContactPhone = eventDto.ContactPhone,
				Tags = eventDto.Tags,
				BackgroundId = await _pictureService.CreatePictureByContent(eventDto.BackgroundImage)
			};
			return newEvent;
		}

		public async Task<bool> DeleteEvent(int eventID)
		{
			var myEvent = await _context.Events.FindAsync(eventID);
			if (myEvent == null)
			{
				return false;
			}
			_context.Events.Remove(myEvent);
			return await _context.SaveChangesAsync() > 0;
		}

		public async Task<IList<Event>> GetEventList()
		{
			var events = await _context.Events.Include(a => a.EventLocation).ToListAsync();
			return events;
		}

		public async Task<Event> GetEvent(int id)
		{
			var myEvent = await _context.Events.Include(a => a.EventLocation).FirstOrDefaultAsync(a => a.Id == id);
			return myEvent;
		}

		public async Task<Event> PostEvent(Event newEvent)
		{
			newEvent.EventLocation = await _locationService.PostLocation(newEvent.EventLocation);
			_context.Events.Add(newEvent);
			await _context.SaveChangesAsync();
			return newEvent;
		}

		public async Task<Event> PutEvent(Event eventToPut)
		{
			var myEvent = await _context.Events.FindAsync(eventToPut.Id);
			if (myEvent == null)
			{
				return null;
			}
			myEvent.CategoryId = eventToPut.CategoryId;
			myEvent.HostId = eventToPut.HostId;
			myEvent.Title = eventToPut.Title;
			myEvent.StartingDate = eventToPut.StartingDate;
			myEvent.EndingDate = eventToPut.EndingDate;
			myEvent.MinimumParticipants = eventToPut.MinimumParticipants;
			myEvent.MaximumParticipants = eventToPut.MaximumParticipants;
			myEvent.AutoCancel = eventToPut.AutoCancel;
			myEvent.AutoJoin = eventToPut.AutoJoin;
			myEvent.JoinDeadline = eventToPut.JoinDeadline;
			myEvent.Fee = eventToPut.Fee;
			myEvent.Description = eventToPut.Description;
			myEvent.EventLocation = await _locationService.PostLocation(eventToPut.EventLocation);
			myEvent.ContactEmail = eventToPut.ContactEmail;
			myEvent.ContactPhone = eventToPut.ContactPhone;
			myEvent.Tags = eventToPut.Tags;
			myEvent.BackgroundId = eventToPut.BackgroundId;

			_context.Events.Update(myEvent);
			await _context.SaveChangesAsync();
			return myEvent;
		}

		public async Task<EventDto> TransformEventDtoForOutput(EventDto eventDto)
		{
			if (eventDto != null)
			{
				eventDto.BackgroundImage = await _pictureService.GetPictureContent(eventDto.BackgroundImage);
			}
			return eventDto;
		}

		public async Task<IList<EventDto>> TransformEventDtoListForOutput(IList<EventDto> eventDtoList)
		{
			IList<EventDto> outputList = new List<EventDto>();
			foreach (EventDto eventDto in eventDtoList)
			{
				outputList.Add(await TransformEventDtoForOutput(eventDto));
			}
			return outputList;
		}

		public async Task<IList<Event>> GetFutureEventList()
		{
			var events = await _context.Events
				 .Where(x => (x.StartingDate >= DateTime.Now)).ToListAsync();
			return events;
		}
		public async Task<IList<Event>> GetFilteredEvents(FiltersDto filtersDto)
		{
			var eventsList = from Events in _context.Events select Events;

			if (filtersDto.Category != null)
			{
				var categoriesMatching = from category in _context.Categories where (category.Title == filtersDto.Category) select category.Id;
				eventsList = eventsList.Where(b => categoriesMatching.Contains(b.CategoryId));
			}

			if (filtersDto.EndingDate.HasValue)
			{
				eventsList = eventsList.Where(b => (b.StartingDate >= filtersDto.StartingDate) && (b.EndingDate <= filtersDto.EndingDate));
			}
			else
			{
				eventsList = eventsList.Where(b => b.StartingDate >= filtersDto.StartingDate);
			}

			return await eventsList.ToListAsync();
		}
	}
}