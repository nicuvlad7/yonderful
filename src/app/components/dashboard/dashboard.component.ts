import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IEvent } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    dashboardEvent: IEvent;

    constructor(private eventService: EventService) { }

    ngOnInit(): void {
        this.eventService.getEvent(2).subscribe((result: IEvent) => {
            this.dashboardEvent = result;
        });
    }
}
