import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
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
	@Output() clickFilterButton = new EventEmitter<FiltersData>();
	@Input() showHiddenSection: boolean;
	@Input() startingDate: Date;
	@Input() endingDate: Date;

	sortDataSelected: SortData = {
		isAscending: true,
		sortBy: 'Start Date',
	};

	filtersDataSelected: FiltersData = {
		startingDate: new Date(),
		hiddenIfFee: false,
		hiddenIfStarted: false,
		categories: [],
		searchTitle: '',
	};

	categoriesPool: Category[];

	sortMethods: string[] = ['Start Date', 'Join Deadline', 'Title', 'Fee'];

	constructor(private categoryService: CategoryService) {}

	ngOnInit(): void {
		if(this.startingDate != null){
			this.filtersDataSelected.startingDate = this.startingDate;
		}
		if(this.endingDate != null){
			this.filtersDataSelected.endingDate = this.endingDate;
		}
		this.categoryService.getCategories().subscribe((categories) => {
			this.categoriesPool = categories.result;
		});
	}

	emitSortData($event: any) {
		this.sortDataSelected.sortBy = $event.value;
		this.sortData.emit(this.sortDataSelected);
	}
	emitClickFilter() {
		this.clickFilterButton.emit(this.filtersDataSelected);
	}

	changeIsAscending() {
		if (this.sortDataSelected.isAscending) {
			this.sortDataSelected.isAscending = false;
		} else if (!this.sortDataSelected.isAscending) {
			this.sortDataSelected.isAscending = true;
		}
		this.sortData.emit(this.sortDataSelected);
	}

	clearFields() {
		this.filtersDataSelected = {
			startingDate: new Date(),
			endingDate: null,
			categories: [],
			hiddenIfFee: false,
			hiddenIfStarted: false,
			searchTitle: '',
		};

		this.sortDataSelected = {
			sortBy: 'Start Date',
			isAscending: true,
		};
	}
}
