import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ChipTag } from 'src/app/models/chip-tag';
import { ActivatedRoute } from '@angular/router';
import { CategoriesResponse } from 'src/app/models/category';
import { EditEventService } from 'src/app/services/edit-event.service';

@Component({
  selector: 'app-create-edit-event-page',
  templateUrl: './create-edit-event-page.component.html',
  styleUrls: ['./create-edit-event-page.component.scss']
})
export class CreateEditEventPageComponent implements OnInit {
  editMode: boolean = false;
  pageTitle: string = (this.editMode) ? 'Edit event' : 'Create event';

  eventGeneralForm!: FormGroup;
  eventLocationForm!: FormGroup;
  eventOthersForm!: FormGroup;

  categoryList: CategoriesResponse = {result: []};
  selectedCategory: string = '';

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: ChipTag[] = [{ tagName: 'Activity' }];

  autocancelChecked: boolean = true;
  autojoinChecked!: boolean;

  constructor(private route: ActivatedRoute, private editEventService: EditEventService) { }

  ngOnInit(): void {
    this.fetchCategoryList();

    this.route.queryParams.subscribe(params => {
      if (params && params['id']) {
        this.editMode = true;
      }
      else {
        this.initEventFormControls();
      }
    })
  }

  fetchCategoryList(): void {
    this.editEventService.fetchAllCategories().subscribe(categories => {
      this.categoryList.result = categories.result;
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
      image: new FormControl('', [Validators.required])
    })
  }

  addTag(event: MatChipInputEvent): void {
    const newTagName = (event.value || '').trim();

    if (newTagName) {
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
}
