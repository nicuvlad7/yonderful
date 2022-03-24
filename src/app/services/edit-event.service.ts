import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse, Category } from '../models/category';
import { UserDetails } from '../models/user';
import { HttpService } from './http.service';
import { UserEvent } from '../models/event';


@Injectable({
  providedIn: 'root'
})
export class EditEventService {

  constructor(private httpService: HttpService) { }

  fetchAllCategories(): Observable<CategoriesResponse> {
    // TODO: change with real api endpoint
    return this.httpService.getAll<CategoriesResponse>('categories');
  }

  fetchCategoryById(categoryId: number): Observable<Category> {
    // TODO change with real api endpoint
    return this.httpService.getById<Category>(categoryId, 'categories');
  }

  fetchCurrentUserDetails(currentUserId: number): Observable<UserDetails> {
    // TODO: change with real api endpoint
    return this.httpService.getById<UserDetails>(currentUserId, "usersDetails")
  }

  fetchCurrentEvent(currentEventId: number): Observable<UserEvent> {
    // TODO: change with real api endpoint
    return this.httpService.getById<UserEvent>(currentEventId, "events");
  }
}
