import { AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteValues } from 'src/app/models/constants';
import { IDashboardEvents } from 'src/app/models/dashboard-event';
import { EventService } from 'src/app/services/event.service';
import { TokenDecoder } from 'src/app/services/token.decoder';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    loading: boolean = true;
    dashboardEvents: IDashboardEvents;
    currentUserId: number;
    areJoinedEvents: boolean;
    areHostedEvents: boolean;

    constructor(private eventService: EventService, private tokenDecoder: TokenDecoder, private router: Router, route: ActivatedRoute) { }

    ngOnInit(): void {
        this.currentUserId = this.tokenDecoder.getCurrentUserId();
        this.eventService.getDashboardEvents(this.currentUserId).subscribe((result) => {
            this.dashboardEvents = result;
            this.areJoinedEvents = this.dashboardEvents.joinedEvents.length !== 0;
            this.areHostedEvents = this.dashboardEvents.hostedEvents.length !== 0;
            this.loading = false;
        });
    }

    navigateToAllEvents() {
        this.router.navigate([RouteValues.ALL_EVENTS]);
    }

    navigateToCreateEvent() {
        this.router.navigate([RouteValues.CREATE_EVENT]);
    }
}
