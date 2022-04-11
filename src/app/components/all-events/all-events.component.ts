import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { RouteValues } from '../../models/constants';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss']
})
export class AllEventsComponent implements OnInit {
  eventsArray: IEvent[];
  isLoading: boolean = true;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.eventService.getFutureEvents().subscribe((events) => {
      this.eventsArray = events.result;
      this.isLoading = false;
    });
  }

  navigateToEventView(eventId: number) {
    this.router.navigate([RouteValues.EVENT_DETAILS + "/" + eventId]);
  }
}
