import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
	selector: 'app-generic-filter',
	templateUrl: './generic-filter.component.html',
	styleUrls: ['./generic-filter.component.scss'],
})
export class GenericFilterComponent implements OnInit {
	@Output() isAscending = new EventEmitter<Boolean>();
  @Output() sortBy = new EventEmitter<string>();
  @Output() startDate = new EventEmitter<Date>();
  @Output() endDate = new EventEmitter<Date>();
  @Output() categories = new EventEmitter<string[]>();
  @Output() hiddenIfFee = new EventEmitter<boolean>();
  @Output() hiddenIfStarted = new EventEmitter<boolean>();
  
  sortBy2:string;
  isAscending2:boolean=false;
	constructor(private categoryService: CategoryService) {}

	ngOnInit(): void {

  }
  emitSortBy(){
    this.sortBy.emit(this.sortBy2);
  }
}
