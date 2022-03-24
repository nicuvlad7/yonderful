import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategoriesResponse, Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  constructor(private http: HttpClient) { }


  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.apiUrl + "employee")
  }

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(environment.apiUrl + "Category") 
  }
  
  deleteCategory(categoryId: number): Observable<unknown> {
    return this.http.delete(environment.apiUrl + "Category", { params: { categoryId: categoryId.toString() } });
  }

  getEventById(eventId: number): Observable<Event> {
    //TODO: THIS MUST BE CHANGED TO WORK PROPERLY
    return this.http.get<Event>(environment.apiUrl + "Event", { params: { eventId: eventId.toString() } });
  }
}
