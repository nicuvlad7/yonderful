import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ChipTag } from 'src/app/models/chip-tag';
import { ActivatedRoute } from '@angular/router';
import { CategoriesResponse } from 'src/app/models/category';
import { EditEventService } from 'src/app/services/edit-event.service';
import { UserDetails } from 'src/app/models/user';
import { UserEvent } from 'src/app/models/event';

@Component({
  selector: 'app-create-edit-event-page',
  templateUrl: './create-edit-event-page.component.html',
  styleUrls: ['./create-edit-event-page.component.scss']
})
export class CreateEditEventPageComponent implements OnInit {
  editMode: boolean = false;
  pageTitle: string = '';
  label: string = '';
  
  // TODO: get current user id from local storage after login
  currentUserId: number = 1;
  currentUser?: UserDetails;

  currentEventId!: number;
  currentEvent?: UserEvent;

  eventGeneralForm!: FormGroup;
  eventLocationForm!: FormGroup;
  eventOthersForm!: FormGroup;

  categoryList: CategoriesResponse = {result: []};
  selectedCategory: string = '';

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: ChipTag[] = [{ tagName: 'Activity' }];

  constructor(private route: ActivatedRoute, private editEventService: EditEventService) { }

  ngOnInit(): void {
    this.fetchCategoryList();
    this.initEventFormControls();

    this.route.params.subscribe(params => {
      this.currentEventId = parseInt(params['id']);
      if (this.currentEventId) {
        // Edit mode
        this.editMode = true;
        this.pageTitle = "Edit event";
        this.label = "Edit"
        this.fetchCurrentEvent();
      }
      else {
        // Create mode
        this.pageTitle = "Create event";
        this.label = "Create"
        this.fetchCurrentUserDetails();
      }
    });

  }

  isEventFromCompleted(): boolean {
    return this.eventGeneralForm.touched && this.eventLocationForm.touched && this.eventOthersForm.touched;
  }

  isEventFormValid(): boolean {
    return this.eventGeneralForm.valid && this.eventLocationForm.valid && this.eventOthersForm.valid;
  }

  isEventFormDone(): boolean {
    return this.isEventFromCompleted() && this.isEventFormValid();
  }

  fetchCategoryList(): void {
    // TODO: use real api when done
    this.editEventService.fetchAllCategories().subscribe(categories => {
      this.categoryList.result = categories.result 
    });
  }

  fetchCurrentUserDetails(): void {
    // TODO: use real api when done
    this.editEventService.fetchCurrentUserDetails(this.currentUserId).subscribe(user => {
      this.currentUser = { ...user };
      this.eventOthersForm.get('email')?.setValue(this.currentUser.email);
      this.eventOthersForm.get('mobileNumber')?.setValue(this.currentUser.phoneNo);
    })
  }

  fetchCurrentEvent(): void {
    // TODO: use real api when done
    this.editEventService.fetchCurrentEvent(this.currentEventId).subscribe(event => {
      // Popualte the General Information form
      this.currentEvent = { ...event };
      this.eventGeneralForm.get('title')?.setValue(this.currentEvent.title);
      
      // TODO: get date from date string
      let startDate = '03/05/2022';
      let startDateObj = new Date(startDate);
      let startTime = '12:00';
      this.eventGeneralForm.get('startEvent')?.get('startDate')?.setValue(startDateObj);
      this.eventGeneralForm.get('startEvent')?.get('startTime')?.setValue(startTime);

      // TODO: get date from date string
      let endDate = '03/06/2022';
      let endDateObj = new Date(endDate);
      let endTime = '14:00';
      this.eventGeneralForm.get('endEvent')?.get('endDate')?.setValue(endDateObj);
      this.eventGeneralForm.get('endEvent')?.get('endTime')?.setValue(endTime);

      this.eventGeneralForm.get('minimumParticipants')?.setValue(this.currentEvent.minimumParticipants);
      this.eventGeneralForm.get('maximumParticipants')?.setValue(this.currentEvent.maximumParticipants);
      
      this.editEventService.fetchCategoryById(this.currentEvent.categoryId).subscribe(category => {
        this.eventGeneralForm.get('category')?.setValue(category);
      })

      this.eventGeneralForm.get('autocancel')?.setValue(this.currentEvent.autocancel);
      this.eventGeneralForm.get('autojoin')?.setValue(this.currentEvent.autojoin);

      // TODO: get date from date string
      let joinDeadlineDate = '03/02/2022';
      let joinDeadlineDateObj = new Date(joinDeadlineDate);
      let joinDeadlineTime = '12:00';
      this.eventGeneralForm.get('joinEvent')?.get('joinDeadlineDate')?.setValue(joinDeadlineDateObj);
      this.eventGeneralForm.get('joinEvent')?.get('joinDeadlineTime')?.setValue(joinDeadlineTime);

      this.eventGeneralForm.get('eventFee')?.setValue(this.currentEvent.fee);
      this.eventGeneralForm.get('description')?.setValue(this.currentEvent.description);
      

      // Populate the Location form
      this.eventLocationForm.get('location')?.setValue(this.currentEvent.eventLocation.location);
      this.eventLocationForm.get('locationDetails')?.setValue(this.currentEvent.eventLocation.locationDetails);
      this.eventLocationForm.get('city')?.setValue(this.currentEvent.eventLocation.city);
      this.eventLocationForm.get('state')?.setValue(this.currentEvent.eventLocation.state);


      // Populate the Others form
      this.eventOthersForm.get('email')?.setValue(this.currentEvent.contactEmail);
      this.eventOthersForm.get('mobileNumber')?.setValue(this.currentEvent.contactMobileNumber);
      let tags = this.currentEvent.tags.split('*');
      for (let tag of tags) {
        if (this.tags.length < 5) {
          this.tags.push( {tagName: tag });
        }
      }
     
    })
  }

  initEventFormControls(): void {
    this.eventGeneralForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      startEvent: new FormGroup({
        startDate: new FormControl('', [Validators.required]),
        startTime: new FormControl('', [Validators.required])
      }),
      endEvent: new FormGroup({
        endDate: new FormControl('', [Validators.required]),
        endTime: new FormControl('', [Validators.required])
      }),
      minimumParticipants: new FormControl(''),
      maximumParticipants: new FormControl(''),
      category: new FormControl('', [Validators.required]),
      autocancel: new FormControl(),
      autojoin: new FormControl(false),
      joinEvent: new FormGroup({
        joinDeadlineDate: new FormControl('', [Validators.required]),
        joinDeadlineTime: new FormControl('', [Validators.required]),
      }),
      eventFee: new FormControl(0),
      description: new FormControl('', [Validators.required])
    });

    this.eventLocationForm = new FormGroup({
      location: new FormControl('', [Validators.required]),
      locationDetails: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required])
    });

    this.eventOthersForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
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
    console.log('Hei');
    console.log(this.eventOthersForm.get('image')?.value);
  }
}
