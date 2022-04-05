import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { DecodeToken } from 'src/app/helpers/decode.token';
import { IAttendance } from 'src/app/models/attendance';
import { RouteValues } from 'src/app/models/constants';
import { IEvent } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { AttendanceService } from 'src/app/services/attendance.service';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService } from 'src/app/services/dialog.service';
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
			province: '',
		},
		contactEmail: '',
		contactPhone: '',
		tags: '',
		backgroundImage: '',
	};
	categoryIcon: SafeResourceUrl;
	tagsList: String[] = [];
	participantsNumber: number;
	currentUserId: number;
	participantsArray: IAttendance[];
	isCurrentUserNotAttending: boolean;
	isMaximumReached: boolean;
	isDeadlineOverdue: boolean;

	constructor(
		private categoryService: CategoryService,
		private eventService: EventService,
		private sanitizer: DomSanitizer,
		private readonly activatedRoute: ActivatedRoute,
		private dialogService: DialogService,
		private router: Router,
		private decodeToken: DecodeToken,
		private attendanceService: AttendanceService
	) {
		this.activatedRoute.params.subscribe((params) => {
			if (params && params.id) {
				this.eventId = params.id;
			}
		});
	}

	ngOnInit(): void {
		this.eventService.getEvent(this.eventId).subscribe((result: IEvent) => {
		this.event = result;
		this.intializeTagsList();
			this.initalizeCategoryIcon();
			this.currentUserId = this.decodeToken.getCurrentUserId();
			this.getCurrentParticipants();
			this.checkJoinDeadlineOverdue();
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

	getCurrentParticipants(): void {
		this.attendanceService.getParticipantsForEvent(this.eventId).subscribe((result) => {
			this.participantsArray = result;
			this.checkIfCurrentuserAttends();
			this.checkIfMaximumReached();
		})
	}

	checkIfCurrentuserAttends(): void {
		this.isCurrentUserNotAttending = true;
		this.participantsArray.forEach(element => {
			if (element.userId == this.currentUserId) {
				this.isCurrentUserNotAttending = false;
			}
		});
	}

	checkIfMaximumReached(): void {
		if (this.participantsArray.length == this.event.maximumParticipants) {
			this.isMaximumReached = true;
		} else {
			this.isMaximumReached = false;
		}
	}

	checkJoinDeadlineOverdue(): void {
		var currentDateTime = new Date();
		var deadlineDate = new Date(this.event.joinDeadline);
		if (currentDateTime > deadlineDate) {
			this.isDeadlineOverdue = true;
		} else {
			this.isDeadlineOverdue = false;
		}
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

  //to-do:
  //remove mock data after demo, and use real data once the endpoints 
  //for attendance are available
  //isEventOwner should recieve a value after a check
  
	testArr: User[] = [
		{ id: 1, name: 'Bill', email: 'abc', password: 'asdcasdcas' },
		{ id: 2, name: 'Richard', email: 'abc', password: 'asdcasdcas' },
		{ id: 3, name: 'Radahan', email: 'abc', password: 'asdcasdcas' },
		{ id: 4, name: 'Godfrey', email: 'abc', password: 'asdcasdcas' },
		{ id: 5, name: 'Michael', email: 'abc', password: 'asdcasdcas' },
	];

	openParticipantsDialog(): Observable<boolean> {
		return this.dialogService.participantsDialog({
			participants: this.testArr,
			isEventOwner: false,
		});
	}

	joinOnEvent(): void {
		var newAttendance: IAttendance = {
			eventId: this.eventId,
			userId: this.currentUserId,
			joinDate: new Date()
		};
		this.attendanceService.addNewAttendance(newAttendance).subscribe((result) => {
			this.getCurrentParticipants();
		});
		
	}

	leaveEvent(): void {
		this.attendanceService.deleteAttendance(this.eventId, this.currentUserId).subscribe((result) => {
			this.getCurrentParticipants();
		});
	}
}
