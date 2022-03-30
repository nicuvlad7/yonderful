import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from '../models/category';
import { catchError } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpService: HttpService) {}

  addNewCategory(category: ICategory): Observable<ICategory> {
    return this.httpService
      .post<ICategory>(category, 'Category')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }

  deleteCategory(id: number): Observable<ICategory> {
    return this.httpService
      .delete<ICategory>(id, `Category?categoryId=`)
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }

  getCategory(id: number): Observable<ICategory> {
    return this.httpService
      .getById<ICategory>(id, 'Category')
      .pipe(map((response) => response.result), catchError(this.httpService.handleHttpErrorResponse));
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    return this.httpService
      .update<ICategory>(category, `Category?categoryId=${category.id}`)
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
}
