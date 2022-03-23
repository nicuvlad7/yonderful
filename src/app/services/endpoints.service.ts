import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { EventDetail } from '../models/event-details';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategoriesResponse, Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  eventList: EventDetail[] = [
    { id: 11, name: 'Hike', category: 'Outdoor' },
    { id: 12, name: 'Ski', category: 'Outdoor' },
    { id: 13, name: 'Running', category: 'Outdoor' },
    { id: 14, name: 'Hike & Fly' ,category: 'Outdoor' },
  ];

  constructor(private http: HttpClient) { }

  getEvents():  Observable<EventDetail[]> {
    // TODO: get the events list from the
    return of(this.eventList);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.apiUrl + "employee")
  }

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(environment.apiUrl + "Category") 
  }
  
  deleteCategory(categoryId: number): Observable<unknown> {
    return this.http.delete(environment.apiUrl + "Category", { params: { categoryId: categoryId.toString() } });
  }
}
