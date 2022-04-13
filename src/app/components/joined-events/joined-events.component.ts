import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteValues } from 'src/app/models/constants';
import { EventsResponse, IEvent } from 'src/app/models/event';
import { FiltersData } from 'src/app/models/filters-data';
import { AppStateService } from 'src/app/services/app-state-service';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-joined-events',
    templateUrl: './joined-events.component.html',
    styleUrls: ['./joined-events.component.scss']
})
export class JoinedEventsComponent implements OnInit {
    eventsArray: Observable<EventsResponse>;
    isLoading: boolean = true;
    currentUserId: number;
    eventsLength: number;
    filterData: FiltersData ={
        startDate: new Date()
    }

    constructor(private eventService: EventService, private router: Router, private appStateService: AppStateService) { }

    ngOnInit(): void {
        this.currentUserId = this.appStateService.observerSessionInfo().value?.id;
        this.filterData.isAttendingId = this.currentUserId;
        this.eventsArray = this.eventService.getFilteredEvents(this.filterData);
        this.eventsArray.subscribe((response) =>{
            this.eventsLength = response.result.length;
            this.isLoading = false;
            console.log(response.result)
        });
    }

    navigateToAllEvents() {
        this.router.navigate([RouteValues.ALL_EVENTS]);
    }
}


