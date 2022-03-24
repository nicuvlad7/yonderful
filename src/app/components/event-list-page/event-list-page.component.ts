import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EventDetail } from 'src/app/models/event-details';
import { EndpointsService } from 'src/app/services/endpoints.service';

@Component({
  selector: 'app-event-list-page',
  templateUrl: './event-list-page.component.html',
  styleUrls: ['./event-list-page.component.scss']
})

export class EventListPageComponent implements OnInit {
  selectedEvent?: EventDetail;
  eventList: EventDetail[] = [];

  constructor(private endpointsService: EndpointsService) 
  {}
  
  ngOnInit(): void {
    this.endpointsService.getEvents().subscribe(result => {
      this.eventList = result;
    });
  }

  onEventClick(event: EventDetail) {
    this.selectedEvent = event;
  }

}
