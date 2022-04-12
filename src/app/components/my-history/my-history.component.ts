import { Component, OnInit } from '@angular/core';
import { EventsResponse } from 'src/app/models/event';

@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.scss']
})
export class MyHistoryComponent implements OnInit {
  
  events: EventsResponse;

  constructor() { }

  ngOnInit(): void {
    
  }

}
