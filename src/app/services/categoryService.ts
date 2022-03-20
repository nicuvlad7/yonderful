import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryCard } from '../models/category';
import { catchError } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpService: HttpService) {}

  newCategory(category: CategoryCard): Observable<CategoryCard> {
    return this.httpService
      .post<CategoryCard>(category, 'Category')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
  getCategory(title: string): Observable<CategoryCard> {
    return this.httpService
      .getByStringProperty<CategoryCard>(title, 'Category')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
  deleteCategory(title: string): Observable<CategoryCard> {
    return this.httpService
      .deleteByProperty<CategoryCard>(title, 'Category')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
  updateCategory(category: CategoryCard): Observable<CategoryCard> {
    return this.httpService
      .update<CategoryCard>(category, 'Category')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
}
