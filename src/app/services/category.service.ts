import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from '../models/category';
import { catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { RouteEndpoints } from '../models/constants';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpService: HttpService) {}

  addNewCategory(category: ICategory): Observable<ICategory> {
    return this.httpService
      .post<ICategory>(category, RouteEndpoints.CATEGORY)
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }

  deleteCategory(id: number): Observable<ICategory> {
    return this.httpService
		.delete<ICategory>(id, RouteEndpoints.CATEGORY+`?categoryId=`)
		.pipe(catchError(this.httpService.handleHttpErrorResponse));
  }

  getCategory(id: number): Observable<ICategory> {
    return this.httpService
		.getById<ICategory>(id, RouteEndpoints.CATEGORY)
		.pipe(
			map((response) => response.result),
			catchError(this.httpService.handleHttpErrorResponse)
		);
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    return this.httpService
		.update<ICategory>(
			category,
			RouteEndpoints.CATEGORY+`?categoryId=${category.id}`
		)
		.pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
}
