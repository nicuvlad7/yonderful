import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CategoriesResponse, Category, CategoryResponse } from '../models/category';
import { UserDetails } from '../models/user';
import { HttpService } from './http.service';
import { IEvent, IUserEventResponse } from '../models/event';


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
    return this.httpService.getAll<CategoriesResponse>('Category');
  }

  fetchCategoryById(categoryId: number): Observable<CategoryResponse> {
    return this.httpService.getById<CategoryResponse>(categoryId, 'Category');
  }

  fetchCurrentUserDetails(currentUserId: number): Observable<UserDetails> {
    return this.httpService.getById<UserDetails>(currentUserId, "User/Id")
  }

  fetchCurrentEvent(currentEventId: number): Observable<IUserEventResponse> {
    return this.httpService.getById<IUserEventResponse>(currentEventId, "Event");
  }
  
  postEvent(event: IEvent): Observable<IEvent> {
    return this.httpService.post<IEvent>(event, 'Event').pipe(
      catchError(this.httpService.handleHttpErrorResponse)
    )
  }

  updateEvent(event: IEvent): Observable<IEvent> {
    return this.httpService.update<IEvent>(event, 'Event').pipe(
      catchError(this.httpService.handleHttpErrorResponse)
    )
  }
}
