import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { RouteValues } from 'src/app/models/constants';
import { EventsResponse, IEvent } from 'src/app/models/event';
import { FiltersData } from 'src/app/models/filters-data';
import { SortData } from 'src/app/models/sort-data';
import { AppStateService } from 'src/app/services/app-state-service';
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
  filterData: FiltersData = {
  };
  sortData: SortData;

  isLoading: boolean = true;
  currentUserId: number;

  defaultStartingDate: Date;
  defaultEndingDate: Date;
  today: Date = new Date();

  defaultSortData: SortData = {
    sortBy: 'startingDate',
    isAscending: true
  };

  constructor(private router: Router, private sortDataService: HelperService, private filterDataService: EventService, private appStateService: AppStateService) { }

  ngOnInit(): void {
    this.currentUserId = this.appStateService.observerSessionInfo().value?.id;

    if(this.title === 'Joined Events'){
      this.filterData.AttendingId = this.currentUserId;
    }
    else if(this.title === 'Hosted Events'){
      this.filterData.HostId = this.currentUserId;
    }
    else if(this.title === 'Future Events'){
      this.defaultStartingDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(),0,0,0);
    }

    this.eventsArrayObservable.subscribe((response) => {
      this.eventsArray = this.sortDataService.sort(this.defaultSortData, response.result);
      this.isLoading = false;
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
    
    filterData = this.prepareFilterData(filterData);

    if(this.title === 'Joined Events' || this.title === 'Hosted Events'){
      this.filterDataService.getNotEndedEvents(filterData).subscribe((result) => {
        this.eventsArray = result.result;
        if(this.sortData == null){
          this.eventsArray = this.sortDataService.sort(this.defaultSortData, this.eventsArray);
        }
        else{
          this.eventsArray = this.sortDataService.sort(this.sortData, this.eventsArray);
        }
      });
    }
    else if(this.title === 'Future Events'){
      this.filterDataService.getFilteredEvents(filterData).subscribe((result) => {
        this.eventsArray = result.result;
        if(this.sortData == null){
          this.eventsArray = this.sortDataService.sort(this.defaultSortData, this.eventsArray);
        }
        else{
          this.eventsArray = this.sortDataService.sort(this.sortData, this.eventsArray);
        }
      });
    }

    

    this.filterData = filterData;
  }

  prepareFilterData(filterData): FiltersData{
    if(this.filterData.AttendingId != null)
      filterData.AttendingId = this.filterData.AttendingId;

    if(this.filterData.HostId != null)
      filterData.HostId = this.filterData.HostId;

    return filterData;
  }

  navigateToEventView(eventId: number): void {
    this.router.navigate([RouteValues.EVENT_DETAILS + "/" + eventId]);
  }
}
