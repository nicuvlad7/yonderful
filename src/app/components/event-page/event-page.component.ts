import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ICategory } from 'src/app/models/category';
import { Event } from 'src/app/models/event';
import { EventLocation } from 'src/app/models/event-location';
import { CategoryService } from 'src/app/services/category.service';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
  eventId: number;
  isHostMode: false;
  event: Event = {
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
    backgroundImage: ''
  };
  categoryIcon: SafeResourceUrl;
  tagsList: String[] = [];
  constructor(private categoryService: CategoryService, private eventService: EventService, private sanitizer: DomSanitizer, private readonly route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.eventId = params.id
      }
    });
   }

  ngOnInit(): void {
    this.eventService.getEvent(this.eventId).subscribe((result: Event) => {
      this.event.id = result['result'].id;
      this.event.categoryId = result['result'].categoryId;
      this.event.hostId = result['result'].hostId;
      this.event.title = result['result'].title;
      this.event.startingDate = result['result'].startingDate;
      this.event.endingDate = result['result'].endingDate;
      this.event.minimumParticipants = result['result'].minimumParticipants;
      this.event.maximumParticipants = result['result'].maximumParticipants;
      this.event.autoCancel = result['result'].autoCancel;
      this.event.autoJoin = result['result'].autoJoin;
      this.event.joinDeadline = result['result'].joinDeadline;
      this.event.fee = result['result'].fee;
      this.event.description = result['result'].description;
      this.event.eventLocation = result['result'].eventLocation;
      this.event.contactEmail = result['result'].contactEmail;
      this.event.contactPhone = result['result'].contactPhone;
      this.event.tags = result['result'].tags;
      this.event.backgroundImage = result['result'].backgroundImage;
      this.intializeTagsList();
      this.initalizeCategoryIcon();
    });
    
  }

  transformStringToImage(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.event.backgroundImage);
  }

  initalizeCategoryIcon(): void {
    this.categoryService.getCategory(this.event.categoryId).subscribe((result) => {
      this.categoryIcon = this.sanitizer.bypassSecurityTrustResourceUrl(result.result.icon);
      console.log(result);
    })
   
  }

  intializeTagsList(): void {
    this.tagsList = this.event.tags.split("*");
  }

  transformDate(date: String): string {
    var splittedDate = date.split('T');
    var yearMonthDayString = splittedDate[0];
    var hourMinuteArray = splittedDate[1].split(':');
    var hourMinuteString = hourMinuteArray[0] + ":" + hourMinuteArray[1];
    return yearMonthDayString + " @ " + hourMinuteString;
  }

  checkIfHostMode() {
    
  }
  
}
