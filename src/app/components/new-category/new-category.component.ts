import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['../../styles/category.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewCategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    titleControl: new FormControl('', [
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
    title: 'Placeholder.',
    backgroundImg: '',
    icon: '',
  };

  loading: boolean = false;
  

  constructor(
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {}

 
  ngOnInit(): void {
    this.categoryForm.get('iconControl')?.valueChanges.subscribe((val) => {
      this.categoryForm.controls['iconControl'].markAsTouched();
    });
    this.categoryForm
      .get('backgroundControl')
      ?.valueChanges.subscribe((val) => {
        this.categoryForm.controls['backgroundControl'].markAsTouched();
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

  onSubmit() {
    if (!this.categoryForm.valid) {
      return;
    }
    this.loading = true;

    this.categoryCard.title = this.categoryForm.get('titleControl')!
      .value as string;
    this.categoryCard.icon = this.categoryForm.get('iconControl')!
      .value as string;
    this.categoryCard.backgroundImg = this.categoryForm.get(
      'backgroundControl'
    )!.value as string;

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
  }
}
