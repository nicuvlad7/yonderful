import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DecodeToken } from 'src/app/helpers/decode.token';
import { RouteValues } from 'src/app/models/constants';
import { IDashboardEvents } from 'src/app/models/dashboard-event';
import { EventService } from 'src/app/services/event.service';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    dashboardEvents: IDashboardEvents;
    currentUserId: number;
    areJoinedEvents: boolean;
    areHostedEvents: boolean;

    constructor(private eventService: EventService, private decodeToken: DecodeToken, private router: Router) {}

    ngOnInit(): void {
        this.currentUserId = this.decodeToken.getCurrentUserId();
        this.eventService.getDashboardEvents(this.currentUserId).subscribe((result) => {
            this.dashboardEvents = result;
            this.checkIfJoinedEvents();
            this.checkIfHostedEvents();
        }
        )
    }

    checkIfJoinedEvents() {
        if (this.dashboardEvents.joinedEvents.length == 0) {
            this.areJoinedEvents = false;
        } else {
            this.areJoinedEvents = true;
        }
    }

    checkIfHostedEvents() {
        if (this.dashboardEvents.hostedEvents.length == 0) {
            this.areHostedEvents = false;
        } else {
            this.areHostedEvents = true;
        }
    }

    navigateToEventView(eventId: number) {
        this.router.navigate([RouteValues.EVENT_DETAILS + "/" + eventId]);
    }

    navigateToAllEvents() {
        this.router.navigate([RouteValues.ALL_EVENTS]);
    }

    navigateToCreateEvent() {
        this.router.navigate([RouteValues.CREATE_EVENT]);
    }
}
