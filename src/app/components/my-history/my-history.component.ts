import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { RouteValues } from 'src/app/models/constants';
import { IEvent } from 'src/app/models/event';
import { FiltersData } from 'src/app/models/filters-data';
import { AppStateService } from 'src/app/services/app-state-service';
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
  categories: ICategory[];
  categoryIdIconMap: Map<number, string>;
  currentUserId: number;
  displayedColumns = ['Icon', 'StartDate', 'Title', 'Host'];

  constructor(private eventService: EventService, private categoryService: CategoryService, private appStateService: AppStateService, private attendanceService: AttendanceService, private router: Router) { }

  ngOnInit(): void {
    this.currentUserId = this.appStateService.getCurrentUserId();
    let filterData: FiltersData = {
      startingDate: new Date("1900-01-01"),
      endingDate: new Date("2100-01-01"),
      AttendingId: this.currentUserId
    };
    
    this.eventService.getFilteredEvents(filterData).subscribe(
      (eventsList) => {
        this.events = eventsList.result;
      }
    );

    this.categoryService.getCategories().subscribe(
      (categoriesResponse) => {
        this.categories = categoriesResponse.result;
        this.initalizeCategoryMap();
      })
  }

  getIcon(categoryId: number): string {
    return this.categoryIdIconMap.get(categoryId);
  }

  initalizeCategoryMap(): void {
    this.categoryIdIconMap = new Map();
    this.categories.forEach(element => {
      this.categoryIdIconMap.set(element.id, element.icon);
    });
  }


  onEventRowClick(selectedRow: any): void {
		const eventId: number = selectedRow.id;
		this.router.navigate([RouteValues.EVENT_DETAILS, eventId]);
	}
}
