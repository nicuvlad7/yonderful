import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecodeToken } from 'src/app/helpers/decode.token';
import { RouteValues } from 'src/app/models/constants';
import { EventsResponse, IEvent } from 'src/app/models/event';
import { FiltersData } from 'src/app/models/filters-data';
import { AttendanceService } from 'src/app/services/attendance.service';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.scss']
})
export class MyHistoryComponent implements OnInit {
  
  
  events: IEvent[];
  categoryIdIconMap: Map<number, string>;
  currentUserId: number;
  displayedColumns = ['Icon', 'StartDate', 'Title', 'Host'];

  constructor(private eventService: EventService, private categoryService: CategoryService, private decodeToken: DecodeToken, private attendanceService: AttendanceService, private router: Router) { }

  ngOnInit(): void {
    this.decodeToken.initializeTokenInfo();
    this.currentUserId = this.decodeToken.getCurrentUserId();
    let filterData: FiltersData = {
      startDate: new Date("1900-01-01"),
      endDate: new Date("2100-01-01"),
      isAttendingId: this.currentUserId
    };
    
    this.eventService.getFilteredEvents(filterData).subscribe(
      (eventsList) => {
        this.events = eventsList.result;
        this.initalizeCategoryMap();
      }
    );
  }

  getIcon(categoryId: number): string {
    return this.categoryIdIconMap.get(categoryId);
  }

  initalizeCategoryMap(): void {
    this.categoryIdIconMap = new Map();
    this.events.forEach(element => {
      this.categoryIdIconMap.set(element.categoryId, this.getCategoryIconString(element.categoryId));
    });
  }

  getCategoryIconString(categoryId: number): string {
    let categoryIconStr: string;
    this.categoryService.getCategory(categoryId).subscribe((category) => { categoryIconStr = category.icon;});
    return categoryIconStr;
  }

  onEventRowClick(selectedRow: any): void {
		const eventId: number = selectedRow.id;
		this.router.navigate([RouteValues.EVENT_DETAILS, eventId]);
	}
}
