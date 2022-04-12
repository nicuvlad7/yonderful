import { Component, OnInit } from '@angular/core';
import { DecodeToken } from 'src/app/helpers/decode.token';
import { EventsResponse, IEvent } from 'src/app/models/event';
import { IFilter } from 'src/app/models/filters';
import { AttendanceService } from 'src/app/services/attendance.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.scss']
})
export class MyHistoryComponent implements OnInit {
  
  events: IEvent[];
  currentUserId: number;
  constructor(private eventService: EventService, private decodeToken: DecodeToken, private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    let filter: IFilter = {
      startingDate: new Date("1900-01-01"),
      endingDate: new Date("2100-01-01"),
      categoryID: 0
    }
    this.decodeToken.initializeTokenInfo();
    this.currentUserId = this.decodeToken.getCurrentUserId();
    this.eventService.getFilteredEvents(filter).subscribe(
      (eventsList) => {
        this.events = eventsList.result;
        this.filterEventsForCurrentUser();

      }
    );
  }

  filterEventsForCurrentUser(): void {
    this.events = this.events.filter((event) => {
      this.attendanceService.getUserAttendance(event.id, this.currentUserId)
      .subscribe((result) => (console.log(result.length)));
    });
  }

}
