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

  eventDetail: EventDetail = {
    id: 1,
    name: 'Hike on Vladeasa',
    description: 'Hiking day with the colleagues on Vladeasa',
    category: 'Outdoor',
    startDate: '13/03/2022'  
  };

  constructor() { }

  ngOnInit(): void {
  }

}
