import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EventDetail } from 'src/app/models/event-details';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EventDetailsComponent implements OnInit {
  @Input() event?: EventDetail;

  constructor() { }

  ngOnInit(): void {
  }

}
