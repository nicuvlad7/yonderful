import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'src/app/models/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryCardComponent implements OnInit {
  categoryForm!: FormGroup;

  initFormControls(): void {
    this.categoryForm = new FormGroup({
      titleControl: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+[a-zA-Z ]*'),
      ]),
      iconControl: new FormControl('', [Validators.required]),
      backgroundControl: new FormControl('', [Validators.required]),
    });
  }

  categoryCard: Category = {
    title: 'Type category name here',
    backgroundImg: '',
    icon: '',
  };

  revertCard: Category = {
    title: 'Type category name here',
    backgroundImg: '',
    icon: '',
  };

  loading: boolean = false;
  editMode: boolean = false;
  canMakeChanges: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initFormControls();

    this.categoryService.getCategory(1).subscribe((result) => {
      this.categoryCard = result;
      this.revertCard = result;
    });

    // if (             this functionality will be implemented once we get the events service
    //   this.eventsService.getEventsHavingCategory(this.categoryCard.title)
    // ) {
    //   this.canMakeChanges = true;
    // } else {
    //   this.canMakeChanges = true;
    // }

    this.categoryForm.get('iconControl')?.valueChanges.subscribe((val) => {
      this.onChangeIcon(val);
    });
    this.categoryForm.get('titleControl')?.valueChanges.subscribe((val) => {
      this.categoryCard.title = val;
    });
    this.categoryForm
      .get('backgroundControl')
      ?.valueChanges.subscribe((val) => {
        this.onChangeBackground(val);
      });
  }

  onChangeIcon(file: File) {
    let reader = new FileReader();
    reader.readAsDataURL(this.categoryForm.get('iconControl')!.value);
    reader.onload = (e) => {
      this.categoryCard.icon = this.domSanitizer.bypassSecurityTrustUrl(
        reader.result as string
      ) as string;
    };
  }

  onChangeBackground(file: File) {
    let reader = new FileReader();
    reader.readAsDataURL(this.categoryForm.get('backgroundControl')!.value);
    reader.onload = (e) => {
      this.categoryCard.backgroundImg =
        this.domSanitizer.bypassSecurityTrustUrl(
          reader.result as string
        ) as string;
    };
  }

  onDiscard() {
    this.editMode = false;
    this.categoryCard.title = this.revertCard.title;
    this.categoryForm.patchValue({ titleControl: this.revertCard.title });
    this.categoryCard.backgroundImg = this.revertCard.backgroundImg;
    this.categoryCard.icon = this.revertCard.icon;
    //implement confirmation dialog with the component that andy will make
  }
  onDelete() {
    if (this.canMakeChanges) {
      this.loading = true;
      this.categoryService.deleteCategory(1).subscribe(
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
  }
  onSubmitForm() {
    if (this.categoryForm.valid) {
      this.loading = true;
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
