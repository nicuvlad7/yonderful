import { L } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { DecodeToken } from 'src/app/helpers/decode.token';
import { RouteValues } from 'src/app/models/constants';
import { IEvent } from 'src/app/models/event';
import { User, UserDetails } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService } from 'src/app/services/dialog.service';
import { EventService } from 'src/app/services/event.service';
import { ParticipantsAttendanceService } from 'src/app/services/participants-attendance.service';

@Component({
	selector: 'app-event-page',
	templateUrl: './event-page.component.html',
	styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
	eventId: number;
	isHostMode: true;
	event: IEvent;
	categoryIcon: SafeResourceUrl;
	tagsList: String[] = [];
	constructor(
		private categoryService: CategoryService,
		private eventService: EventService,
		private participantsService: ParticipantsAttendanceService,
		private sanitizer: DomSanitizer,
		private readonly activatedRoute: ActivatedRoute,
		private dialogService: DialogService,
		private decodeToken: DecodeToken,
		private router: Router
	) {
		this.activatedRoute.params.subscribe((params) => {
			if (params && params.id) {
				this.eventId = params.id;
			}
		});
	}

  ngOnInit(): void {
	this.decodeToken.initializeTokenInfo();
    this.eventService.getEvent(this.eventId).subscribe((result: IEvent) => {
		this.event = result;
		this.intializeTagsList();
		this.initalizeCategoryIcon();
    });
  }

	initalizeCategoryIcon(): void {
		this.categoryService
			.getCategory(this.event.categoryId)
			.subscribe((result) => {
				this.categoryIcon =
					this.sanitizer.bypassSecurityTrustResourceUrl(result.icon);
			});
	}

	intializeTagsList(): void {
		this.tagsList = this.event.tags.split('*');
	}

	getMapLink(): string {
		return (
			'https://www.google.com/maps/place/' +
			this.event.eventLocation.street +
			'+' +
			this.event.eventLocation.address +
			'+' +
			this.event.eventLocation.city
		);
	}

	deleteEvent(): void {
		this.openChangeRoleDialog().subscribe((result) => {
			if (result) {
				this.eventService.deleteEvent(this.eventId).subscribe();
				//TODO should redirect to hosted events page
				this.router.navigate([
					'/' + RouteValues.ADMINISTRATE_CATEGORIES,
				]);
			}
		});
	}

	openChangeRoleDialog(): Observable<boolean> {
		return this.dialogService.confirmDialog({
			title: 'Delete Event',
			message: 'Are you sure you want to delete the current event?',
			confirmText: 'Yes',
			cancelText: 'No',
		});
	}

	openParticipantsDialog(): Observable<boolean> {
		var eventParticipants: UserDetails[] = [];
		var isHost: boolean;

		this.participantsService.getParticipant(this.event.id).subscribe(
			(result:UserDetails[]) => {
				console.log(result);
				result.forEach(function (value){
					eventParticipants.push(value);
				});
			});
		
		isHost = this.event.hostId == this.decodeToken.getCurrentUserId();

		return this.dialogService.participantsDialog({
			participants: eventParticipants,
			isEventOwner: isHost,
			eventId: this.eventId
		});
	}
}
