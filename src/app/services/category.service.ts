import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../models/category';
import { catchError } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpService: HttpService) {}

  newCategory(category: Category): Observable<Category> {
    return this.httpService
      .post<Category>(category, 'Category')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
  
  deleteCategory(id: number): Observable<Category> {
    return this.httpService
      .delete<Category>(id, 'Category')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }

  getCategory(id: number): Observable<Category> {
    return this.httpService
      .getById<Category>(id, 'Category')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpService
      .update<Category>(category, 'Category')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
}
