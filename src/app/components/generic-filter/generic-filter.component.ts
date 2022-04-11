import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FiltersData } from 'src/app/models/filters-data';
import { SortData } from 'src/app/models/sort-data';
import { CategoryService } from 'src/app/services/category.service';

@Component({
	selector: 'app-generic-filter',
	templateUrl: './generic-filter.component.html',
	styleUrls: ['./generic-filter.component.scss'],
})
export class GenericFilterComponent implements OnInit {
	@Output() sortData = new EventEmitter<SortData>();
	@Output() filtersData = new EventEmitter<FiltersData>();
	@Output() clickFilterButton = new EventEmitter();
	@Input() showHiddenSection: boolean;

	sortDataSelected: SortData = {
		isAscending: false,
		sortBy: 'Start Date',
	};

	filtersDataSelected: FiltersData = {
		startDate: new Date(),
		hiddenIfFee: false,
		hiddenIfStarted: false,
		categories: [],
		searchTitle: '',
	};

	categoriesPool: string[];

	sortMethods: string[] = ['Start Date', 'Join Deadline', 'Title', 'Fee'];

	constructor(private categoryService: CategoryService) {}

	ngOnInit(): void {
		this.categoryService.getCategories().subscribe((categories) => {
			this.categoriesPool = categories.result.map((el) => el.title);
		});
	}

	emitSortData() {
		this.sortData.emit(this.sortDataSelected);
	}

	emitFiltersData() {
		this.filtersData.emit(this.filtersDataSelected);
	}

	emitClickFilter() {
		this.clickFilterButton.emit();
	}

	changeIsAscending() {
		if (this.sortDataSelected.isAscending) {
			this.sortDataSelected.isAscending = false;
		} else if (!this.sortDataSelected.isAscending) {
			this.sortDataSelected.isAscending = true;
		}
	}

	clearFields() {
		this.filtersDataSelected = {
			startDate: new Date(),
			endDate: null,
			categories: [],
			hiddenIfFee: false,
			hiddenIfStarted: false,
			searchTitle: '',
		};

		this.sortDataSelected = {
			sortBy: 'Start Date',
			isAscending: false,
		};
	}
}
