import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteValues } from 'src/app/models/constants';
import { EventsResponse, IEvent } from 'src/app/models/event';
import { FiltersData } from 'src/app/models/filters-data';
import { SortData } from 'src/app/models/sort-data';
import { EventService } from 'src/app/services/event.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-generic-event-page',
  templateUrl: './generic-event-page.component.html',
  styleUrls: ['./generic-event-page.component.scss']
})
export class GenericEventPageComponent implements OnInit {
  @Input() eventsArrayObservable: Observable<EventsResponse>;
  @Input() title: string;
  @Input() showFilterCheckboxes: boolean;

  eventsArray: IEvent[];
  filterData: FiltersData;
  sortData: SortData;

  defaultSortData: SortData = {
    sortBy: 'startingDate',
    isAscending: true
  };

  constructor(private router: Router, private sortDataService: HelperService, private filterDataService: EventService) { }

  ngOnInit(): void {
    this.eventsArrayObservable.subscribe((response) => {
      this.eventsArray = this.sortDataService.sort(this.defaultSortData, response.result);
    })
  }

  sortEvents(sortData): void {
    if(sortData.sortBy === 'Start Date'){
      sortData.sortBy = 'startingDate';
    }
    else if(sortData.sortBy === 'Join Deadline'){
      sortData.sortBy = 'joinDeadline';
    }
    else if(sortData.sortBy === 'Title'){
      sortData.sortBy = 'title';
    }
    else if(sortData.sortBy === 'Fee'){
      sortData.sortBy = 'fee';
    }

    this.eventsArray = this.sortDataService.sort(sortData, this.eventsArray);
    this.sortData = sortData;
  }

  filterEvents(filterData): void{
    this.filterDataService.getFilteredEvents(filterData).subscribe((result) => {
      this.eventsArray = result.result;
      if(this.sortData == null){
        this.eventsArray = this.sortDataService.sort(this.defaultSortData, this.eventsArray);
      }
      else{
        this.eventsArray = this.sortDataService.sort(this.sortData, this.eventsArray);
      }
    });
    this.filterData = filterData;
  }

  showHiddenSection(): boolean{
    if(this.title === 'Future Events')
      return true;
    return false;
  }

  navigateToEventView(eventId: number): void {
    this.router.navigate([RouteValues.EVENT_DETAILS + "/" + eventId]);
  }
}
