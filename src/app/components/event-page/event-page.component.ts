import { Component, Input, OnInit, TestabilityRegistry } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { DecodeToken } from 'src/app/helpers/decode.token';
import { RouteValues } from 'src/app/models/constants';
import { IEvent } from 'src/app/models/event';
import { User } from 'src/app/models/user';
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
    longDate = 'dd.MM.yyyy, HH:ss';
    eventId: number;
    isHostMode: boolean = true;
    noOfParticipants: number;
    mapLink: string;
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
    constructor(
        private categoryService: CategoryService,
        private eventService: EventService,
        private sanitizer: DomSanitizer,
        private participantsAttendanceService: ParticipantsAttendanceService,
        private decodeToken: DecodeToken,
        private readonly activatedRoute: ActivatedRoute,
        private dialogService: DialogService,
        private router: Router
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
            this.mapLink = this.getMapLink();
            this.intializeTagsList();
            this.initalizeCategoryIcon();
            if (this.event.hostId == this.decodeToken.getCurrentUserId()) {
                this.isHostMode = true;
            }
        });
        this.noOfParticipants = this.testArr.length;
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
}
