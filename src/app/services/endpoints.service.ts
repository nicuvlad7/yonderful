import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategoryCard } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private http: HttpClient) {}

  getCategory(title: string): Observable<CategoryCard> {
    return this.http.get<CategoryCard>(
      environment.apiUrl + '/category/' + title
    );
  }

  newCategory(category: CategoryCard): Observable<CategoryCard> {
    return this.http.post<CategoryCard>(
      environment.apiUrl + '/mails/category/new',
      category
    );
  }

  updateCategory(category: CategoryCard): Observable<CategoryCard> {
    return this.http.put<CategoryCard>(
      environment.apiUrl + '/category',
      category
    );
  }

  getEventsHavingCategory(categoryTitle: string): Observable<boolean> {
    return this.http.post<boolean>(
      environment.apiUrl + '/events',
      categoryTitle
    );
  }
  deleteCategory(title: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl + '/category/' + title);
  }

 
}
