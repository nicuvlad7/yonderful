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

@Component({
	selector: 'app-category-card',
	templateUrl: './category-card.component.html',
	styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
	categoryForm: FormGroup = new FormGroup({
		titleControl: new FormControl('Placeholder', [
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

	categoryCard: ICategory = {
		title: '',
		defaultBackground: '',
		icon: '',
	};
	loading: boolean = false;
	editMode: boolean = false;
	canMakeChanges: boolean = true;
	urlID: number = -1;
	constructor(
		private categoryService: CategoryService,
		private _snackBar: MatSnackBar,
		private route: ActivatedRoute,
		private dialogService: DialogService,
		private router: Router
	) {}

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

		this.urlID = parseInt(this.route.snapshot.paramMap.get('id'));

		let editModeParam: string =
			this.route.snapshot.queryParamMap.get('editMode') || '';

		if (!this.urlID) {
			this.editMode = true;
			this.canMakeChanges = true;
			return;
		}
		
		this.loading = true;
		this.categoryService.getCategory(this.urlID).subscribe(
			(result: ICategory) => {
				this.loading = false;
				this.categoryCard.id = result['result'].id;
				this.categoryCard.title = result['result'].title;
				this.categoryCard.icon = result['result'].icon;
				this.categoryCard.defaultBackground =
					result['result'].defaultBackground;

				this.categoryForm.patchValue({
					['titleControl']: result['result'].title,
					['backgroundControl']: result['result'].defaultBackground,
					['iconControl']: result['result'].icon,
				});
			},
			(error) => {
				{
					this.loading = false;
					this._snackBar.open(
						`Error status ${error.status}: ${error.message}`,
						'',
						{
							duration: 5000,
						}
					);
				}
			}
		);
		if (editModeParam == 'true') {
			this.editMode = true;
		}
		if (editModeParam == 'false') {
			this.editMode = false;
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
			this.editMode = false;
			this.categoryForm.reset({
				titleControl: this.categoryCard.title,
				backgroundControl: this.categoryCard.defaultBackground,
				iconControl: this.categoryCard.icon,
			});
			this.categoryForm.controls['iconControl'].markAsUntouched();
			this.categoryForm.controls['backgroundControl'].markAsUntouched();
		});
	}
	onDelete() {
		if (!this.canMakeChanges) {
			return;
		}
		this.openDeleteDialog().subscribe((result) => {
			if (result) {
				this.loading = true;
				this.categoryService
					.deleteCategory(this.categoryCard.id!)
					.subscribe(
						(result) => {
							this.loading = false;
							this._snackBar.open('Category was deleted.', '', {
								duration: 3000,
							});
							this.router.navigate(['/']);
						},
						(error) => {
							this.loading = false;
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
			return;
		}
		this.loading = true;

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
					this.loading = false;
					this._snackBar.open('Category was added.', '', {
						duration: 1500,
					});
					this.router.navigate(['/administrate-categories']);
				},
				(error) => {
					this.loading = false;
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
					this.loading = false;
					this._snackBar.open('Category was updated.', '', {
						duration: 3000,
					});
					this.router.navigate(['/administrate-categories']);
				},
				(error) => {
					this.loading = false;
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
	}
}
