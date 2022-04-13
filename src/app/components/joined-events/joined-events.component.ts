import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecodeToken } from 'src/app/helpers/decode.token';
import { RouteValues } from 'src/app/models/constants';
import { IEvent } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-joined-events',
    templateUrl: './joined-events.component.html',
    styleUrls: ['./joined-events.component.scss']
})
export class JoinedEventsComponent implements OnInit {
    eventsArray: IEvent[];
    isLoading: boolean = true;
    currentUserId: number;

    constructor(private eventService: EventService, private router: Router, private decodeToken: DecodeToken) { }

    ngOnInit(): void {
        this.decodeToken.initializeTokenInfo();
        this.currentUserId = this.decodeToken.getCurrentUserId();

        this.eventService.getJoinedEventsForUser(this.currentUserId).subscribe((events) => {
            this.eventsArray = events;
            this.isLoading = false;
        });
    }

    navigateToAllEvents() {
        this.router.navigate([RouteValues.ALL_EVENTS]);
    }
}


