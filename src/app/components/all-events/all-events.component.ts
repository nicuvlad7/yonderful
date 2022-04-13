import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsResponse, IEvent } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
	selector: 'app-all-events',
	templateUrl: './all-events.component.html',
	styleUrls: ['./all-events.component.scss'],
})
export class AllEventsComponent implements OnInit {
	eventsArrayObservable: Observable<EventsResponse>;

  	constructor(private eventService: EventService) { }

	ngOnInit(): void {
		this.eventsArrayObservable = this.eventService.getFutureEvents();
	}
}
