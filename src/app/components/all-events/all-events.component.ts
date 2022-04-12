import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
	selector: 'app-all-events',
	templateUrl: './all-events.component.html',
	styleUrls: ['./all-events.component.scss'],
})
export class AllEventsComponent implements OnInit {
	eventsArray: IEvent[];

  constructor(private eventService: EventService) { }

	ngOnInit(): void {
		this.eventService.getFutureEvents().subscribe((events) => {
			this.eventsArray = events.result;
		});
	}

<<<<<<< HEAD
	navigateToEventView(eventId: number) {
		this.router.navigate([RouteValues.EVENT_DETAILS + '/' + eventId]);
	}
=======
>>>>>>> b6647e1a84450ba9bc6496033316ccedc01ec472
}
