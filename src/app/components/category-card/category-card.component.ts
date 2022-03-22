import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ICategory } from 'src/app/models/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let urlID: number = 0;
    this.route.params.subscribe((params) => {
      urlID = parseInt(params['id']);
    });
    // this.loading = true;
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

  onDiscard() {
    //todo:
    //implement confirmation dialog with the component that andy will make
    this.editMode = false;
    this.categoryForm.reset();
  }
  onDelete() {
    //todo:
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
  onSubmit() {
    if(this.categoryForm.valid){
      this.loading = true;

      this.categoryCard.title=this.categoryForm.get('titleControl')!.value as string;
      this.categoryCard.icon=this.categoryForm.get('iconControl')!.value as string;
      this.categoryCard.backgroundImg=this.categoryForm.get('backgroundControl')!.value as string;
     
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
