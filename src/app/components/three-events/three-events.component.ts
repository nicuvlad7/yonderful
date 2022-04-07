import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteValues } from 'src/app/models/constants';
import { IEvent } from 'src/app/models/event';

@Component({
  selector: 'app-three-events',
  templateUrl: './three-events.component.html',
  styleUrls: ['./three-events.component.scss']
})
export class ThreeEventsComponent implements OnInit {
  
  @Input() eventsList: IEvent[];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToEventView(eventId: number) {
    this.router.navigate([RouteValues.EVENT_DETAILS + "/" + eventId]);
}

}
