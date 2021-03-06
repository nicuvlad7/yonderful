import { Component, OnInit } from '@angular/core';
import { Category, CategoryToShow } from 'src/app/models/category';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { Observable, sequenceEqual } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';
import { RouteValues } from 'src/app/models/constants';

@Component({
	selector: 'app-categories-table',
	templateUrl: './categories-table.component.html',
	styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent implements OnInit {
	dataSource: Category[] = [];
	displayedCategories: CategoryToShow[] = [];
	displayedColumns = ['Icon', 'Title', 'Actions'];
	isLoading: boolean = true;

	constructor(
		private endpointsService: EndpointsService,
		private sanitizer: DomSanitizer,
		private dialogService: DialogService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.endpointsService.getCategories().subscribe((categories) => {
			this.dataSource = categories.result;
			this.createCategoriesToShow();
			this.isLoading = false;
		});
	}

	deleteCategory(categoryId: number): void {
		this.openChangeRoleDialog().subscribe((result) => {
			if (result)
				this.endpointsService
					.deleteCategory(categoryId)
					.subscribe(() => {
						this.displayedCategories =
							this.displayedCategories.filter(
								(category: CategoryToShow) =>
									category.id != categoryId
							);

						this.router.navigate([
							RouteValues.ADMINISTRATE_CATEGORIES,
						]);
					});
		});
	}

	createCategoriesToShow(): void {
		for (const category of this.dataSource) {
			let newCategory: CategoryToShow = {
				id: category.id,
				title: category.title,
				icon: this.sanitizer.bypassSecurityTrustResourceUrl(
					category.icon
				),
				defaultBackground:
					this.sanitizer.bypassSecurityTrustResourceUrl(
						category.defaultBackground
					),
				hasEvents: category.hasEvents,
			};
			this.displayedCategories.push(newCategory);
		}
	}

	openChangeRoleDialog(): Observable<boolean> {
		return this.dialogService.confirmDialog({
			title: 'Delete Category',
			message: 'Are you sure you want to delete this category?',
			confirmText: 'Yes',
			cancelText: 'No',
		});
	}

	editCategory(categoryId: number): void {
		this.router.navigate([RouteValues.CATEGORY, categoryId], {
			queryParams: { editMode: true },
		});
	}

	onCategoryRowClick(selectedRow: any): void {
		const categoryId: number = selectedRow.id;
		this.router.navigate([RouteValues.CATEGORY, categoryId]);
	}

	navigatetoCategoryNew(): void {
		this.router.navigate([RouteValues.CATEGORY_NEW]);
	}
}
