import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER, } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ChipTag } from 'src/app/models/chip-tag';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesResponse } from 'src/app/models/category';
import { EditEventService } from 'src/app/services/edit-event.service';
import { UserDetails } from 'src/app/models/user';
import { IEvent } from 'src/app/models/event';
import { timeStringParser } from 'src/app/helpers/helpers';
import { eventEndTimeValidator, eventParticipantsIntervalValidator } from 'src/app/helpers/validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DecodeToken } from 'src/app/helpers/decode.token';

@Component({
    selector: 'app-create-edit-event-page',
    templateUrl: './create-edit-event-page.component.html',
    styleUrls: ['./create-edit-event-page.component.scss']
})
export class CreateEditEventPageComponent implements OnInit {
    editMode: boolean = false;
    pageTitle: string = '';
    label: string = '';
    buttonIconLabel: string = ''

    // TODO: get current user id from local storage after login
    // The User object stored in local storage does not have an attribute for id
    currentUserId!: number;
    currentUser?: UserDetails;

    currentEventId!: number;
    currentEvent?: IEvent;

    eventGeneralForm!: FormGroup;
    eventLocationForm!: FormGroup;
    eventOthersForm!: FormGroup;
    isFormReady!: boolean;

    currentDate?: Date;

    categoryList: CategoriesResponse = { result: [] };
    selectedCategoryId?: number;

    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    tags: ChipTag[] = [];

    constructor(
        private route: ActivatedRoute,
        private editEventService: EditEventService,
        private snackBar: MatSnackBar,
        private decodeToken: DecodeToken,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.currentDate = new Date();
        this.currentUserId = this.getCurrentLoggedInUserId();
        this.fetchCategoryList();
        this.initEventFormControls();

        this.route.params.subscribe(params => {
            this.currentEventId = parseInt(params['id']);
            if (this.currentEventId) {
                // Edit mode
                this.editMode = true;
                this.pageTitle = "Edit event";
                this.label = "Edit";
                this.fetchCurrentEvent();
            }
            else {
                // Create mode
                this.pageTitle = "Create event";
                this.label = "Create";
                this.fetchCurrentUserDetails();
            }

        });
    }

    getCurrentLoggedInUserId(): number {
        return this.decodeToken.getCurrentUserId();
    }

    isEventFormValid(): boolean {
        return this.eventGeneralForm.valid && this.eventLocationForm.valid && this.eventOthersForm.valid;
    }

    fetchCategoryList(): void {
        this.editEventService.fetchAllCategories().subscribe(categories => {
            this.categoryList.result = categories.result;
            this.categoryList.result.push();
        });
    }

    fetchCurrentUserDetails(): void {
        this.editEventService.fetchCurrentUserDetails(this.currentUserId).subscribe(user => {
            this.currentUser = { ...user };
            this.eventOthersForm.get('email')?.setValue(this.currentUser.email);
            this.eventOthersForm.get('mobileNumber')?.setValue(this.currentUser.phoneNo);
        })
    }

    fetchCurrentEvent(): void {
        this.editEventService.fetchCurrentEvent(this.currentEventId).subscribe(event => {
            this.currentEvent = { ...event.result };

            this.eventGeneralForm.patchValue({
                title: this.currentEvent.title,
                participantsInterval: {
                    maximumParticipants: this.currentEvent.maximumParticipants,
                    minimumParticipants: this.currentEvent.minimumParticipants,
                },
                category: this.currentEvent.categoryId,
                autocancel: this.currentEvent.autoCancel,
                autojoin: this.currentEvent.autoJoin,
                fee: this.currentEvent.fee,
                description: this.currentEvent.description
            });

            this.eventLocationForm.patchValue({
                street: this.currentEvent.eventLocation.street,
                address: this.currentEvent.eventLocation.address,
                city: this.currentEvent.eventLocation.city,
                province: this.currentEvent.eventLocation.province
            });

            this.eventOthersForm.patchValue({
                email: this.currentEvent.contactEmail,
                mobileNumber: this.currentEvent.contactPhone,
                image: this.currentEvent.backgroundImage
            });

            this.selectedCategoryId = this.currentEvent.categoryId;

            let startDate = new Date(this.currentEvent.startingDate);
            let startTime = startDate.getHours() + ':' + startDate.getMinutes();

            let endDate = new Date(this.currentEvent.endingDate);
            let endTime = endDate.getHours() + ':' + endDate.getMinutes();

            let joinDeadlineDate = new Date(this.currentEvent.joinDeadline);
            let joinDeadlineTime = joinDeadlineDate.getHours() + ':' + joinDeadlineDate.getMinutes();

            this.eventGeneralForm.patchValue({
                eventDates: {
                    startDate: startDate,
                    startTime: startTime,
                    endDate: endDate,
                    endTime: endTime
                },
                joinEvent: {
                    joinDeadlineDate: joinDeadlineDate,
                    joinDeadlineTime: joinDeadlineTime
                }
            })

            let tags = this.currentEvent.tags.split('*');
            for (let tag of tags) {
                if (this.tags.length < 5 && tag !== '') {
                    this.tags.push({ tagName: tag });
                }
            }

        })
    }

    initEventFormControls(): void {
        this.eventGeneralForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            eventDates: new FormGroup({
                startDate: new FormControl('', [Validators.required]),
                startTime: new FormControl('', [Validators.required]),
                endDate: new FormControl('', [Validators.required]),
                endTime: new FormControl('', [Validators.required])
            }, eventEndTimeValidator()),
            participantsInterval: new FormGroup({
                minimumParticipants: new FormControl('', [Validators.pattern("^[0-9]*")]),
                maximumParticipants: new FormControl('', [Validators.pattern("^[0-9]*")])
            }, eventParticipantsIntervalValidator()),
            category: new FormControl('', [Validators.required]),
            autocancel: new FormControl(''),
            autojoin: new FormControl(''),
            joinEvent: new FormGroup({
                joinDeadlineDate: new FormControl('', [Validators.required]),
                joinDeadlineTime: new FormControl('', [Validators.required]),
            }),
            eventFee: new FormControl(0, [Validators.pattern("^[0-9]*")]),
            description: new FormControl('', [Validators.required])
        });

        this.eventLocationForm = new FormGroup({
            street: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            province: new FormControl('', [Validators.required])
        });

        this.eventOthersForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.pattern("^[a-z]+(\.){0,1}[a-z\-]*@[a-z]+(\-){0,1}[a-z]*(\.){1}com$")]),
            mobileNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
            image: new FormControl()
        })

    }

    addTag(event: MatChipInputEvent): void {
        const newTagName = (event.value || '').trim();

        if (newTagName && this.tags.length < 5) {
            this.tags.push({ tagName: newTagName });
        }

        event.chipInput!.clear();

    }

    removeTag(tag: ChipTag): void {
        const index = this.tags.indexOf(tag);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }

    onEventAction(): void {
        let startDate: Date = this.eventGeneralForm.get('eventDates')!.get('startDate')!.value
        let startTime: string = this.eventGeneralForm.get('eventDates')?.get('startTime')!.value;
        let timeDict = timeStringParser(startTime);
        startDate.setHours(timeDict.hours, timeDict.minutes, 0, 0);
        startDate.setHours(startDate.getHours() - startDate.getTimezoneOffset() / 60);

        let endDate: Date = this.eventGeneralForm.get('eventDates')!.get('endDate')!.value;
        let endTime: string = this.eventGeneralForm.get('eventDates')?.get('endTime')!.value;
        timeDict = timeStringParser(endTime);
        endDate.setHours(timeDict.hours, timeDict.minutes, 0, 0);
        endDate.setHours(endDate.getHours() - endDate.getTimezoneOffset() / 60);

        let joinDeadlineDate: Date = this.eventGeneralForm.get('joinEvent')!.get('joinDeadlineDate')!.value;
        let joinDeadlineTime: string = this.eventGeneralForm.get('joinEvent')?.get('joinDeadlineTime')!.value;
        timeDict = timeStringParser(joinDeadlineTime);
        joinDeadlineDate.setHours(timeDict.hours, timeDict.minutes, 0, 0);
        joinDeadlineDate.setHours(joinDeadlineDate.getHours() - joinDeadlineDate.getTimezoneOffset() / 60);

        let eventId: number = 0;
        let locationId: number = 0;
        if (this.editMode) {
            eventId = this.currentEvent!.id;
            locationId = this.currentEvent!.id;
        }

        let tags: string = '';
        for (let tag of this.tags) {
            tags += tag.tagName + '*';
        }

        let autoCancel: boolean = this.eventGeneralForm.get('autocancel')?.value ? this.eventGeneralForm.get('autoCancel')?.value : false;
        let autoJoin: boolean = this.eventGeneralForm.get('autojoin')?.value ? this.eventGeneralForm.get('autojoin')?.value : false;
        let fee: number = this.eventGeneralForm.get('fee')?.value ? parseInt(this.eventGeneralForm.get('fee')?.value, 10) : 0;
        let minimumParticipants = this.eventGeneralForm.get('participantsInterval')?.get('minimumParticipants')?.value ?
            this.eventGeneralForm.get('participantsInterval')?.get('minimumParticipants')?.value : 0;
        let maximumParticipants = this.eventGeneralForm.get('participantsInterval')?.get('maximumParticipants')?.value ?
            this.eventGeneralForm.get('participantsInterval')?.get('maximumParticipants')?.value : 0;

        let userEvent: IEvent = {
            id: eventId,
            categoryId: this.eventGeneralForm.get('category')!.value,
            hostId: this.currentUserId,
            title: this.eventGeneralForm.get('title')!.value,
            startingDate: startDate.toISOString(),
            endingDate: endDate.toISOString(),
            minimumParticipants: minimumParticipants,
            maximumParticipants: maximumParticipants,
            autoCancel: autoCancel,
            autoJoin: autoJoin,
            joinDeadline: joinDeadlineDate.toISOString(),
            fee: fee,
            description: this.eventGeneralForm.get('description')!.value,
            eventLocation: {
                id: locationId,
                street: this.eventLocationForm.get('street')!.value,
                address: this.eventLocationForm.get('address')!.value,
                city: this.eventLocationForm.get('city')!.value,
                province: this.eventLocationForm.get('province')!.value
            },
            contactEmail: this.eventOthersForm.get('email')!.value,
            contactPhone: this.eventOthersForm.get('mobileNumber')!.value,
            tags: tags,
            backgroundImage: this.eventOthersForm.get('image')!.value
        }

        if (this.editMode) {
            this.editEventService.updateEvent(userEvent).subscribe({
                next: (data: IEvent) => {
                    this.snackBar.open(`Event ${data.title} has been edited.`, '', {
                        duration: 2500
                    });
                },
                error: (error: Error) => {
                    this.snackBar.open(error.message, 'Close');
                }
            });
        }
        else {
            this.editEventService.postEvent(userEvent).subscribe({
                next: (data: IEvent) => {
                    this.snackBar.open(`Event ${data.title} has been created`, '', {
                        duration: 2500
                    })
                    this.router.navigate['new-event'];
                },
                error: (error: Error) => {
                    this.snackBar.open(error.message, 'Close');
                }
            })
        }

    }
}
