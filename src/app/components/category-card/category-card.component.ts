import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'src/app/models/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';

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
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    let urlID: number = 0;
    this.route.params.subscribe((params) => {
      urlID = + params['id'];
    });
    this.loading = true;
    this.categoryService.getCategory(urlID).subscribe(
      (result) => {
        this.loading = false;
        this.categoryCard = result;
        this.revertCard = result;
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
    //implement confirmation dialog with the component that andy will make
    this.editMode = false;
    this.categoryCard.title = this.revertCard.title;
    this.categoryForm.patchValue({ titleControl: this.revertCard.title });
    this.categoryCard.backgroundImg = this.revertCard.backgroundImg;
    this.categoryCard.icon = this.revertCard.icon;

  }
  onDelete() {
    //implement confirmation dialog with the component that andy will make
    if (this.canMakeChanges) {
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
