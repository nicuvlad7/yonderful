import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryCard } from 'src/app/models/category';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryCardComponent implements OnInit {
  categoryCard: CategoryCard = {
    title: 'Placeholder.',
    backgroundImg: new File(['a'], 'mock', { type: 'zip' }),
    icon: new File(['a'], 'mock', { type: 'zip' }),
  };

  revertCard: CategoryCard = {
    title: 'Placeholder.',
    backgroundImg: new File(['a'], 'mock', { type: 'zip' }),
    icon: new File(['a'], 'mock', { type: 'zip' }),
  };

  backgroundImg: any;
  iconImg: any;
  
  title: string = '';
  editMode: boolean = false;
  canMakeChanges: boolean = false;
  
  constructor(private endpointsService: EndpointsService,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.endpointsService.getCategory('placeholder').subscribe((result) => {
      this.categoryCard.title = result.title;
      this.categoryCard.icon = result.icon;
      this.categoryCard.backgroundImg = result.backgroundImg;

      this.revertCard.title = result.title;
      this.revertCard.icon = result.icon;
      this.revertCard.backgroundImg = result.backgroundImg;
    });

    if (
      this.endpointsService.getEventsHavingCategory(this.categoryCard.title)
    ) {
      this.canMakeChanges = false;
    } else {
      this.canMakeChanges = true;
    }
  }

  onChangeIcon(eventData: { file: File }): void {
    this.categoryCard.icon = eventData.file;
    var reader = new FileReader();
    reader.readAsDataURL(eventData.file);
    reader.onload = (e) => (this.iconImg = reader.result);
  }
 
  
  onChangeBackground(eventData: { file: File }): void {
    this.categoryCard.backgroundImg = eventData.file;
    var reader = new FileReader();
    reader.readAsDataURL(eventData.file);
    reader.onload = (e) => (this.backgroundImg = reader.result);
  }
  validateTitle(): boolean {
    if (this.title.length > 0 && this.title.length < 36) return true;
    return false;
  }
  onDiscard() {
    this.editMode = false;
    this.categoryCard.title = this.revertCard.title;
    this.categoryCard.backgroundImg = this.revertCard.backgroundImg;
    this.categoryCard.icon = this.revertCard.icon;
    //implement confirmation dialog with the component that andy will make
  }
  onDelete() {
    if (this.canMakeChanges) {
      this.endpointsService.deleteCategory(this.title).subscribe((result) => {
        this._snackBar.open('Category was deleted.', '', {
          duration: 3000,
        });
      },(error)=>{
        this._snackBar.open(`Error status ${error.status}: ${error.message}`, '', {
          duration: 5000,
        });
      });
    }
  }
  onSubmitForm() {
    if (this.validateTitle()) {
      alert('Title size is incorrect.');
      return;
    }

    this.endpointsService
      .updateCategory(this.categoryCard)
      .subscribe((result) => {
        this._snackBar.open('Category was updated.', '', {
          duration: 3000,
        });
      },(error)=>{
        this._snackBar.open(`Error status ${error.status}: ${error.message}`, '', {
          duration: 5000,
        });
      });
  }
  onEditClick() {
    this.editMode = true;
  }
}
