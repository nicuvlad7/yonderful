import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryCard } from 'src/app/models/category';
import { EndpointsService } from 'src/app/services/endpoints.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewCategoryComponent implements OnInit {
  categoryCard: CategoryCard = {
    title: '',
    backgroundImg: new File(['a'], 'mock', { type: 'image' }),
    icon: new File(['a'], 'mock', { type: 'image' }),
  };

  backgroundImg: any;
  iconImg: any;
  title: string = '';

  constructor(
    private endpointsService: EndpointsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

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
  validateBackground(): boolean {
    if (this.categoryCard.backgroundImg.name != 'mock') {
      return true;
    }
    return false;
  }
  validateIcon(): boolean {
    if (this.categoryCard.icon.name != 'mock') {
      return true;
    }
    return false;
  }
  onSubmitForm() {
    if (this.validateTitle() === false) {
      alert('Title is missing or too long.');
      return;
    }
    if (this.validateBackground() === false) {
      alert('Choose a background image.');
      return;
    }
    if (this.validateIcon() === false) {
      alert('Choose an icon image.');
      return;
    }

    this.endpointsService.newCategory(this.categoryCard).subscribe((result) => {
      this._snackBar.open('Category was added.', '', {
        duration: 3000,
      });
    },(error)=>{
      this._snackBar.open(`Error status ${error.status}: ${error.message}`, '', {
        duration: 5000,
      });
    });
  }
}
