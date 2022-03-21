import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from 'src/app/models/category';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class NewCategoryComponent implements OnInit {
  categoryForm!: FormGroup;

  categoryCard: ICategory = {
    title: 'Placeholder.',
    backgroundImg: '',
    icon: '',
  };


  loading: boolean = false;
  displayIconError: boolean = false;
  displayBgError: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer
  ) {}

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
  disableIconError() {
    this.displayIconError = false;
  }
  disableBgError() {
    this.displayBgError = false;
  }
  ngOnInit(): void {
    this.initFormControls();
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

  onSubmitForm() {
    if (this.categoryForm.valid) {
      this.loading = true;
      
      this.categoryService.addNewCategory(this.categoryCard).subscribe(
        (result) => {
          this.loading = false;
          this._snackBar.open('Category was added.', '', {
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
    } else {
      if (this.categoryForm.controls['iconControl'].invalid) {
        this.displayIconError = true;
      }
      if (this.categoryForm.controls['backgroundControl'].invalid) {
        this.displayBgError = true;
      }
    }
  }
}
