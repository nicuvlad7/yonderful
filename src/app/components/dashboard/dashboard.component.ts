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
  eventId = 2;

  constructor(private eventService: EventService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.eventService.getEvent(this.eventId).subscribe((result: IEvent) => {
      this.dashboardEvent = result['result'];
      
    });
  }
}
