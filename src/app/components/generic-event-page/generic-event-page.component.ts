import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteValues } from 'src/app/models/constants';
import { IEvent } from 'src/app/models/event';

@Component({
  selector: 'app-generic-event-page',
  templateUrl: './generic-event-page.component.html',
  styleUrls: ['./generic-event-page.component.scss']
})
export class GenericEventPageComponent implements OnInit {
  @Input() eventsArray: IEvent[];
  @Input() title: string;
  @Input() showFilterCheckboxes: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToEventView(eventId: number): void {
    this.router.navigate([RouteValues.EVENT_DETAILS + "/" + eventId]);
  }
}
