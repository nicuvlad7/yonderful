import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { RouteValues } from 'src/app/models/constants';
import { IEvent } from 'src/app/models/event';
import { FiltersData } from 'src/app/models/filters-data';
import { SortData } from 'src/app/models/sort-data';
import { AppStateService } from 'src/app/services/app-state-service';
import { AttendanceService } from 'src/app/services/attendance.service';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-my-history',
	templateUrl: './my-history.component.html',
	styleUrls: ['./my-history.component.scss'],
})
export class MyHistoryComponent implements OnInit {
	events = new MatTableDataSource<IEvent>();
	categories: ICategory[];
	categoryIdIconMap: Map<number, string>;
	currentUserId: number;
	displayedColumns = ['Icon', 'StartDate', 'Title', 'Host'];
	isLoadingEvents: boolean = true;
	isLoadingCategories: boolean = true;
	filterData: FiltersData;
	sortData: SortData;

	defaultSortData: SortData = {
		sortBy: 'startingDate',
		isAscending: true,
	};

	constructor(
		private eventService: EventService,
		private categoryService: CategoryService,
		private appStateService: AppStateService,
		private attendanceService: AttendanceService,
		private router: Router,
		private sortDataService: HelperService
	) {}

	ngOnInit(): void {
		this.currentUserId = this.appStateService.getCurrentUserId();
		let filterData: FiltersData = {
			startingDate: new Date('1900-01-01'),
			endingDate: new Date(),
			AttendingId: this.currentUserId,
		};
		this.eventService
			.getFilteredEvents(filterData)
			.subscribe((eventsList) => {
				this.events.data = eventsList.result;
				this.isLoadingEvents = false;
			});
		this.categoryService.getCategories().subscribe((categoriesResponse) => {
			this.categories = categoriesResponse.result;
			this.initalizeCategoryMap();
			this.isLoadingCategories = false;
		});
	}

	getIcon(categoryId: number): string {
		return this.categoryIdIconMap.get(categoryId);
	}

	initalizeCategoryMap(): void {
		this.categoryIdIconMap = new Map();
		this.categories.forEach((element) => {
			this.categoryIdIconMap.set(element.id, element.icon);
		});
	}

	onEventRowClick(selectedRow: any): void {
		const eventId: number = selectedRow.id;
		this.router.navigate([RouteValues.EVENT_DETAILS, eventId]);
	}

	sortEvents(sortData): void {
		if (sortData.sortBy === 'Start Date') {
			sortData.sortBy = 'startingDate';
		} else if (sortData.sortBy === 'Join Deadline') {
			sortData.sortBy = 'joinDeadline';
		} else if (sortData.sortBy === 'Title') {
			sortData.sortBy = 'title';
		} else if (sortData.sortBy === 'Fee') {
			sortData.sortBy = 'fee';
		}
		this.events.data = this.sortDataService.sort(
			sortData,
			this.events.data
		);
		this.sortData = sortData;
	}

	filterEvents(filterData): void {
		let currentDate = new Date();
		if (filterData.startingDate == null) {
			filterData.startingDate = new Date('1900-01-01');
		}
		if (
			filterData.endingDate == null ||
			filterData.endingDate > currentDate
		) {
			filterData.endingDate = currentDate;
		}
		filterData.AttendingId = this.currentUserId;

		this.eventService.getFilteredEvents(filterData).subscribe((result) => {
			this.events.data = result.result;
			if (this.sortData == null) {
				this.events.data = this.sortDataService.sort(
					this.defaultSortData,
					this.events.data
				);
			} else {
				this.events.data = this.sortDataService.sort(
					this.sortData,
					this.events.data
				);
			}
		});
		this.filterData = filterData;
	}
}
