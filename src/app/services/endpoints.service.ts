import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategoryCard } from '../models/category';



@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private http: HttpClient) {}
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  getCategory(title: string): Observable<CategoryCard> {
    return this.http.get<CategoryCard>(
      environment.apiUrl + '/category/' + title
    );
  }
  getCategories(): Observable<CategoryCard[]> {
    return this.http.get<CategoryCard[]>(
      environment.apiUrl + 'api/Category/'
    );
  }

  newCategory(category: Object): Observable<boolean> {
    return this.http.post<boolean>(
      environment.apiUrl + 'api/Category',
      category,this.options
    );
  }

  updateCategory(category: CategoryCard): Observable<CategoryCard> {
    return this.http.put<CategoryCard>(
      environment.apiUrl + '/Category',
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
