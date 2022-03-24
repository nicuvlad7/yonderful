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

  getTime(dateString: string): string {
    let timeTokens: string[] =  dateString.split('T')[1].split(':');
    return timeTokens[0] + ':' + timeTokens[1];
  }

  fetchAllCategories(): Observable<CategoriesResponse> {
    return this.httpService.getAll<CategoriesResponse>('categoriesResponse');
    // return this.httpService.getAll<CategoriesResponse>('Category');
  }

  fetchCategoryById(categoryId: number): Observable<Category> {
    return this.httpService.getById<Category>(categoryId, 'categories');
    // return this.httpService.getById<Category>(categoryId, 'Category');
  }

  fetchCurrentUserDetails(currentUserId: number): Observable<UserDetails> {
    return this.httpService.getById<UserDetails>(currentUserId, "usersDetails");
    // return this.httpService.getById<UserDetails>(currentUserId, "User/Id")
  }

  fetchCurrentEvent(currentEventId: number): Observable<UserEvent> {
    return this.httpService.getById<UserEvent>(currentEventId, "events");
    // return this.httpService.getById<UserEvent>(currentEventId, "Event");
  }

  postEvent(event: UserEvent): Observable<UserEvent> {
    return this.httpService.post<UserEvent>(event, 'events');
    // return this.httpService.post<UserEvent>(event, 'events');
  }
}
