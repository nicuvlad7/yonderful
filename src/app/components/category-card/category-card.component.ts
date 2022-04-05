import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ICategory } from 'src/app/models/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';
import { ConfirmDialogData } from 'src/app/models/confirm-dialog-data';
import { RouteValues } from 'src/app/models/constants';

@Component({
	selector: 'app-category-card',
	templateUrl: './category-card.component.html',
	styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
	categoryForm: FormGroup;

	categoryCard: ICategory = {
		title: '',
		defaultBackground: '',
		icon: '',
	};

	editMode: boolean = false;
	createNewCategory: boolean = false;
	canMakeChanges: boolean = true;
	urlID: number = -1;
	pageTitle: string = '';
	isParamNan: boolean = this.testNaN(this.urlID);

	constructor(
		private categoryService: CategoryService,
		private _snackBar: MatSnackBar,
		private route: ActivatedRoute,
		private dialogService: DialogService,
		private router: Router
	) {
		
	}

	initCategoryForm(): void {
		this.categoryForm = new FormGroup({
			titleControl: new FormControl( { value: 'Placeholder', disabled: true }, [
				Validators.required,
				Validators.pattern('^[a-zA-Z]+[a-zA-Z ]*'),
				Validators.maxLength(24),
			]),
			iconControl: new FormControl('', [
				Validators.required,
				this.validateExtension,
			]),
			backgroundControl: new FormControl('', [
				Validators.required,
				this.validateExtension,
			]),
		});
	}

	validateExtension(control: AbstractControl): { [key: string]: any } | null {
		let extn = control.value as string;
		if (extn.substring(5, 10) != 'image') {
			return { wrongFileFormat: { value: control.value } };
		} else {
			return null;
		}
	}

	testNaN(param: number) {
		return isNaN(param) ? true : false;
	}

	ngOnInit(): void {
		//to-do:
		//on page init we should look for events that belong in the current category
		//we are in, and if there are , dont let it be delete-able nor changes to its title
		this.initCategoryForm();

		this.urlID = parseInt(this.route.snapshot.paramMap.get('id'));

		let editModeParam: string =
			this.route.snapshot.queryParamMap.get('editMode') || '';

		if (!this.urlID) {
			this.editMode = true;
			this.canMakeChanges = true;
			this.pageTitle = "New Category";
			this.createNewCategory = true;
			this.categoryForm.controls.titleControl.enable();
			return;
		}

		this.categoryService.getCategory(this.urlID).subscribe(
			(result: ICategory) => {
				this.categoryCard.id = result.id;
				this.categoryCard.title = result.title;
				this.categoryCard.icon = result.icon;
				this.categoryCard.defaultBackground = result.defaultBackground;

				this.categoryForm.patchValue({
					['titleControl']: result.title,
					['backgroundControl']: result.defaultBackground,
					['iconControl']: result.icon,
				});
			},
			(error) => {
				{
					if (error.status != undefined) {
						this._snackBar.open(
							`Error status ${error.status}: ${error.message}`,
							'',
							{
								duration: 5000,
							}
						);
					}
				}
			}
		);
		if (editModeParam == 'true') {
			this.pageTitle = 'Edit Category';
			this.editMode = true;
			this.categoryForm.controls.titleControl.enable();
		}
		if (editModeParam == 'false') {
			this.pageTitle = 'Category';
			this.editMode = false;
			this.categoryForm.controls.titleControl.disable();
		}
		if (editModeParam == '') {
			this.pageTitle = 'Category';
		}
	}

	openDiscardDialog(): Observable<boolean> {
		return this.dialogService.confirmDialog({
			title: 'Confirm discard.',
			message: 'Are you sure you want to revert your changes??',
			confirmText: 'Yes',
			cancelText: 'No',
		});
	}

	openDeleteDialog(): Observable<boolean> {
		return this.dialogService.confirmDialog({
			title: 'Confirm deletion.',
			message: 'Are you sure you want to delete this category??',
			confirmText: 'Yes',
			cancelText: 'No',
		});
	}

	onDiscard() {
		this.openDiscardDialog().subscribe((result) => {
			if (!result) {
				return;
			}

			this.categoryForm.reset({
				titleControl: this.categoryCard.title,
				backgroundControl: this.categoryCard.defaultBackground,
				iconControl: this.categoryCard.icon,
			});
			this.categoryForm.controls['iconControl'].markAsUntouched();
			this.categoryForm.controls['backgroundControl'].markAsUntouched();
			
			if (this.createNewCategory) {
				this.router.navigate([RouteValues.ADMINISTRATE_CATEGORIES]);
				return;
			}

			if (this.editMode) {
				this.editMode = false;
				this.ngOnInit();
			}
			
		});
	}

	onDelete() {
		if (!this.canMakeChanges) {
			return;
		}
		this.openDeleteDialog().subscribe((result) => {
			if (result) {
				this.categoryService
					.deleteCategory(this.categoryCard.id!)
					.subscribe(
						(result) => {
							this._snackBar.open('Category was deleted.', '', {
								duration: 3000,
							});
							this.router.navigate([RouteValues.ADMINISTRATE_CATEGORIES]);
						},
						(error) => {
							this._snackBar.open(
								`Error status ${error.status}: ${error.message}`,
								'',
								{
									duration: 5000,
								}
							);
						}
					);
			}
		});
	}
	onSubmit() {
		if (!this.categoryForm.valid) {
			console.log('HereInvalid');
			return;
		}
		console.log('Here');

		this.categoryCard.title = this.categoryForm.get('titleControl')!
			.value as string;
		this.categoryCard.icon = this.categoryForm.get('iconControl')!
			.value as string;
		this.categoryCard.defaultBackground = this.categoryForm.get(
			'backgroundControl'
		)!.value as string;

		if (!this.urlID) {
			this.categoryService.addNewCategory(this.categoryCard).subscribe(
				(result) => {
					this._snackBar.open('Category was added.', '', {
						duration: 1500,
					});
					this.router.navigate([RouteValues.ADMINISTRATE_CATEGORIES]);
				},
				(error) => {
					this._snackBar.open(
						`Error status ${error.status}: ${error.message}`,
						'',
						{
							duration: 5000,
						}
					);
				}
			);
		} else {
			this.categoryService.updateCategory(this.categoryCard).subscribe(
				(result) => {
					this._snackBar.open('Category was updated.', '', {
						duration: 3000,
					});
					this.router.navigate([RouteValues.ADMINISTRATE_CATEGORIES]);
				},
				(error) => {
					this._snackBar.open(
						`Error status ${error.status}: ${error.message}`,
						'',
						{
							duration: 5000,
						}
					);
				}
			);
		}
	}
	onEditClick() {
		this.editMode = true;
		this.pageTitle = 'Edit Category';
		this.categoryForm.controls.titleControl.enable();
	}
}
