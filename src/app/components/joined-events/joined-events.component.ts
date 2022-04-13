import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteValues } from 'src/app/models/constants';
import { EventsResponse, IEvent } from 'src/app/models/event';
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

    constructor(private eventService: EventService, private router: Router, private appStateService: AppStateService) { }

    ngOnInit(): void {
        this.currentUserId = this.appStateService.observerSessionInfo().value?.id;
        this.eventsArray = this.eventService.getJoinedEventsForUser(this.currentUserId);
        this.isLoading = false;
    }

    navigateToAllEvents() {
        this.router.navigate([RouteValues.ALL_EVENTS]);
    }
}


