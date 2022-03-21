import { Component, OnInit } from '@angular/core';
import { Category, CategoryToShow } from 'src/app/models/category';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  dataSource: Category[] = [];
  categoriesToShowArray: CategoryToShow[] = [];
  displayedColumns = ["Icon", "Title", "Actions"];
  valoare: Number = 0;
  constructor(private endpointsService: EndpointsService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.endpointsService.getCategories().subscribe(categories => {
      this.dataSource = categories.result;
      this.createCategoriesToShow();
    });
    
    
  }

  createCategoriesToShow(): void {
    for (const category of this.dataSource) {
      let newCategory: CategoryToShow = {
        title: category.title,
        icon: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + category.icon),
        defaultBackground: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + category.defaultBackground),
      }
      this.categoriesToShowArray.push(newCategory);
    }
  }
}

