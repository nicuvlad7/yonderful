import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryCard } from 'src/app/models/category-card';
import { EndpointsService } from 'src/app/services/endpoints.service';

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

  backgroundImg: any;
  iconImg: any;
  title: string = '';
  editMode: boolean = false;
  canMakeChanges: boolean = false;

  constructor(private endpointsService: EndpointsService) {}

  ngOnInit(): void {
    this.endpointsService.getCategory('placeholder').subscribe((result) => {
      this.categoryCard.title = result.title;
      this.categoryCard.icon = result.icon;
      this.categoryCard.backgroundImg = result.backgroundImg;
    });

    if (
      this.endpointsService.getEventsHavingCategory(this.categoryCard.title)
    ) {
      this.canMakeChanges = false;
    }
    else{
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
  // fileToImg(file: File):any{
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = (e) =>  { return reader.result ;}
  // }
  onSubmitForm() {
    const formData: any = new FormData();

    formData.append('title', this.title);
    formData.append('icon', this.iconImg);
    formData.append('backgroundImg', this.backgroundImg);

    this.endpointsService.newCategory(formData).subscribe((result) => {
      console.log(result);
    });
  }
  test() {
    console.log(this.categoryCard.title);
  }
  onEditClick() {
    this.editMode = true;
  }
}
