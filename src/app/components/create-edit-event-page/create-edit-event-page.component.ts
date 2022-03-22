import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit-event-page',
  templateUrl: './create-edit-event-page.component.html',
  styleUrls: ['./create-edit-event-page.component.scss']
})
export class CreateEditEventPageComponent implements OnInit {
  @Input() editMode: boolean = false;
  pageTitle: string = (this.editMode) ? 'Edit event' : 'Create event';

  eventForm!: FormGroup


  constructor() { }

  ngOnInit(): void {
    this.initEventFormControls();
  }

  initEventFormControls(): void {
    this.eventForm = new FormGroup({
      eventTitle: new FormControl('', [Validators.required]),
      startEvent: new FormGroup({
        startDate: new FormControl('', [Validators.required]),
        startTime: new FormControl('', [Validators.required])
      }),
      endEvent: new FormGroup({
        endDate: new FormControl('', [Validators.required]),
        endTime: new FormControl('', [Validators.required])
      }),
      mininumParticipants: new FormControl(),
      maximumParticipants: new FormControl(),
      category: new FormControl('', [Validators.required]),
      autocancel: new FormControl(false),
      autojoin: new FormControl(false),
      joinEvent: new FormGroup({
        joinDeadline: new FormControl('', [Validators.required]),
        joinDeadlineTime: new FormControl('', [Validators.required]),
        eventFee: new FormControl(0, [Validators.required])
      }),
      description: new FormControl('', [Validators.required]),
      location: new FormGroup({
        streetAddress: new FormControl('', [Validators.required]),
        otherInfo: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required])
      }),
      contact: new FormGroup({
        email: new FormControl('', [Validators.required]),
        mobile: new FormControl('', [Validators.required])
      }),
      tags: new FormControl('')
    })
  }

}
