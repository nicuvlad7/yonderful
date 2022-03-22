import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewCategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    titleControl: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+[a-zA-Z ]*'),
    ]),
    iconControl: new FormControl('', [Validators.required]),
    backgroundControl: new FormControl('', [Validators.required]),
  });

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
    private _snackBar: MatSnackBar
  ) {}

  disableIconError() {
    this.displayIconError = false;
  }
  disableBgError() {
    this.displayBgError = false;
  }
  ngOnInit(): void {}

  onSubmit() {
    if (this.categoryForm.valid) {
      this.loading = true;
      
      this.categoryCard.title=this.categoryForm.get('titleControl')!.value as string;
      this.categoryCard.icon=this.categoryForm.get('iconControl')!.value as string;
      this.categoryCard.backgroundImg=this.categoryForm.get('backgroundControl')!.value as string;

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
