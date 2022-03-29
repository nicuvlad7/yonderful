import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { ICategory } from 'src/app/models/category';
import { RouteValues } from 'src/app/models/constants';
import { IEvent } from 'src/app/models/event';
import { EventLocation } from 'src/app/models/event-location';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService } from 'src/app/services/dialog.service';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
  eventId: number;
  isHostMode: true;
  event: IEvent = {
    id: 0,
    categoryId: 0,
    hostId: 0,
    title: '',
    startingDate: '',
    endingDate: '',
    minimumParticipants: 0,
    maximumParticipants: 0,
    autoCancel: true,
    autoJoin: true,
    joinDeadline: '',
    fee: 0,
    description: '',
    eventLocation: {
      id: 0,
      street: '',
      address: '',
      city: '',
      province: ''
    },
    contactEmail: '',
    contactPhone: '',
    tags: '',
    backgroundImage: '',
  };
  categoryIcon: SafeResourceUrl;
  tagsList: String[] = [];
  constructor(private categoryService: CategoryService, private eventService: EventService, private sanitizer: DomSanitizer, private readonly activatedRoute: ActivatedRoute, private dialogService: DialogService, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      if (params && params.id) {
        this.eventId = params.id
      }
    });
   }

  ngOnInit(): void {
    this.eventService.getEvent(this.eventId).subscribe((result: IEvent) => {
      this.event = result['result'];

      this.intializeTagsList();
      this.initalizeCategoryIcon();
    });
    
  }

  initalizeCategoryIcon(): void {
    this.categoryService.getCategory(this.event.categoryId).subscribe((result) => {
      this.categoryIcon = this.sanitizer.bypassSecurityTrustResourceUrl(result.result.icon);
    })
   
  }

  intializeTagsList(): void {
    this.tagsList = this.event.tags.split("*");
  }

  getMapLink(): string {
    return "https://www.google.com/maps/place/" + this.event.eventLocation.street + "+" + this.event.eventLocation.address + "+" + this.event.eventLocation.city;
  }

  deleteEvent(): void {
    this.openChangeRoleDialog().subscribe(result => {
      if (result) {
        this.eventService.deleteEvent(this.eventId).subscribe();
        //TODO should redirect to hosted events page
        this.router.navigate(['/' + RouteValues.ADMINISTRATE_CATEGORIES]);
      }
    });
  }

  openChangeRoleDialog(): Observable<boolean>{
    return this.dialogService.confirmDialog({
      title: 'Delete Event',
      message: 'Are you sure you want to delete the current event?',
      confirmText: 'Yes',
      cancelText: 'No'
    })
  }
}
