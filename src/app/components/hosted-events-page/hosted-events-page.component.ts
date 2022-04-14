import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteValues } from 'src/app/models/constants';
import { EventsResponse } from 'src/app/models/event';
import { FiltersData } from 'src/app/models/filters-data';
import { AppStateService } from 'src/app/services/app-state-service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-hosted-events-page',
  templateUrl: './hosted-events-page.component.html',
  styleUrls: ['./hosted-events-page.component.scss']
})
export class HostedEventsPageComponent implements OnInit {

  eventsArrayObservable: Observable<EventsResponse>;
	isLoading: boolean = true;
  currentUserId: number;
  eventsLength: number;
  filterData: FiltersData ={
  }

  constructor(private eventService: EventService, private router: Router, private appStateService: AppStateService) { }

  ngOnInit(): void {
    this.currentUserId = this.appStateService.observerSessionInfo().value?.id;
    this.filterData.HostId = this.currentUserId;
    this.eventsArrayObservable = this.eventService.getNotEndedEvents(this.filterData);
      this.eventsArrayObservable.subscribe((response) =>{
        this.eventsLength = response.result.length;
        this.isLoading = false;
    });
  }

  navigateToCreateEvent() {
    this.router.navigate([RouteValues.CREATE_EVENT]);
  }
}
