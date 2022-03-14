import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryCard } from 'src/app/models/category-card';
import { EndpointsService } from 'src/app/services/endpoints.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryCardComponent implements OnInit {

  categoryCard: CategoryCard = {
    title : 'test',
  }

  constructor(private endpointsService: EndpointsService) { }

  ngOnInit(): void {
    this.endpointsService.getCategory("placeholder").subscribe(result => {
      this.categoryCard=result;
    })
  }
  
}
