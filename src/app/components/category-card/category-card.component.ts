import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ICategory } from 'src/app/models/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['../../styles/category.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryCardComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    titleControl: new FormControl('Placeholder', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+[a-zA-Z ]*'),
    ]),
    iconControl: new FormControl('', [Validators.required]),
    backgroundControl: new FormControl('', [Validators.required]),
  });

  categoryCard: ICategory = {
    title: '',
    backgroundImg: '',
    icon: '',
  };

  displayTitleError: boolean = false;
  loading: boolean = false;
  editMode: boolean = false;
  canMakeChanges: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    //to-do:
    //on page init we should look for events that belong in the current category
    //we are in, and if there are , dont let it be delete-able nor changes to its title

    let urlID: number = 0;
    this.route.params.subscribe((params) => {
      urlID = parseInt(params['id']);
    });
    this.loading = true;
    this.categoryService.getCategory(urlID).subscribe(
      (result) => {
        this.loading = false;

        this.categoryCard.id = result.id;
        this.categoryCard.title = result.title;
        this.categoryCard.icon = result.icon;
        this.categoryCard.backgroundImg = result.backgroundImg;

        this.categoryForm.patchValue({
          ['titleControl']: result.title,
          ['backgroundControl']: result.backgroundImg,
          ['iconControl']: result.icon,
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
      if (result) this.editMode = false;
      this.categoryForm.reset();
    });
  }
  onDelete() {
    if (this.canMakeChanges) {
      this.openDeleteDialog().subscribe((result) => {
        if (result) {
          this.loading = true;
          this.categoryService.deleteCategory(this.categoryCard.id!).subscribe(
            (result) => {
              this.loading = false;
              this._snackBar.open('Category was deleted.', '', {
                duration: 3000,
              });
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
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      this.loading = true;

      this.categoryCard.title = this.categoryForm.get('titleControl')!
        .value as string;
      this.categoryCard.icon = this.categoryForm.get('iconControl')!
        .value as string;
      this.categoryCard.backgroundImg = this.categoryForm.get(
        'backgroundControl'
      )!.value as string;

      this.categoryService.updateCategory(this.categoryCard).subscribe(
        (result) => {
          this.loading = false;
          this._snackBar.open('Category was updated.', '', {
            duration: 3000,
          });
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
