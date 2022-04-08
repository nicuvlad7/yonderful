import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, takeUntil } from 'rxjs';
import { DecodeToken } from 'src/app/helpers/decode.token';
import { IAttendance } from 'src/app/models/attendance';
import { RouteValues } from 'src/app/models/constants';
import { IEvent } from 'src/app/models/event';
import { UserDetails } from 'src/app/models/user';
import { AttendanceService } from 'src/app/services/attendance.service';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService } from 'src/app/services/dialog.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-event-page',
	templateUrl: './event-page.component.html',
	styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
	loading = true;
	eventId: number;
	isHostMode: boolean;
	event: IEvent;
	categoryIcon: SafeResourceUrl;
	tagsList: String[] = [];
	participantsNumber: number;
	currentUserId: number;
	currentUser: UserDetails;
	participantsArray: UserDetails[];
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
		private attendanceService: AttendanceService,
		private userService: UserService
	) {
		this.activatedRoute.params.subscribe((params) => {
			if (params && params.id) {
				this.eventId = params.id;
			}
		});
	}

	ngOnInit(): void {
		forkJoin([
			this.eventService.getEvent(this.eventId),
			this.attendanceService.getParticipantsForEvent(this.eventId)
		]).subscribe(result => {
			this.event = result[0];
			this.participantsArray = result[1];
			this.decodeToken.initializeTokenInfo();
			this.currentUserId = this.decodeToken.getCurrentUserId();
			this.userService.getUserById(this.currentUserId).subscribe((result) => {this.currentUser = result});
			this.isCurrentUserNotAttending = this.participantsArray.find(participant => participant.id == this.currentUserId) === undefined;
			this.isMaximumReached = this.participantsArray.length === this.event.maximumParticipants;
			this.intializeTagsList();
			this.initalizeCategoryIcon();
			this.checkJoinDeadlineOverdue();
			this.isHostMode = this.currentUserId == this.event.hostId;
			this.loading = false;
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

	checkJoinDeadlineOverdue(): void {
		var currentDateTime = new Date();
		var deadlineDate = new Date(this.event.joinDeadline);
		this.isDeadlineOverdue = currentDateTime > deadlineDate;
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

	editEvent(): void {
		this.router.navigate([
			'/' + RouteValues.EVENT + '/' + this.eventId,
		]);
	}

	openChangeRoleDialog(): Observable<boolean> {
		return this.dialogService.confirmDialog({
			title: 'Delete Event',
			message: 'Are you sure you want to delete the current event?',
			confirmText: 'Yes',
			cancelText: 'No',
		});
	}

	openParticipantsDialog(): void {
        var isHost: boolean;
        isHost = this.event.hostId == this.decodeToken.getCurrentUserId();
        this.dialogService.participantsDialog({
            participants: this.participantsArray,
            isEventOwner: isHost,
            eventId: this.eventId
        }).subscribe(() => {this.attendanceService.getParticipantsForEvent(this.eventId).subscribe(
            (result) => { this.participantsArray = result;}
        );});

    }

	joinOnEvent(): void {
		var newAttendance: IAttendance = {
			eventId: this.eventId,
			userId: this.currentUserId,
			joinDate: new Date()
		};
		this.attendanceService.addNewAttendance(newAttendance).subscribe((result) => {
			this.isCurrentUserNotAttending = false;
			this.participantsArray.push(this.currentUser);
		});
	}

	leaveEvent(): void {
		this.attendanceService.deleteAttendance(this.eventId, this.currentUserId).subscribe((result) => {
			this.isCurrentUserNotAttending = true;
			this.participantsArray = this.participantsArray.filter(participant => participant.id != this.currentUserId);
		});
	}
}
