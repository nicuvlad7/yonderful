import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CategoriesResponse, Category, CategoryResponse } from '../models/category';
import { UserDetails } from '../models/user';
import { HttpService } from './http.service';
import { IEvent, IUserEventResponse } from '../models/event';
import { RouteEndpoints } from '../models/constants';


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
    return this.httpService.getAll<CategoriesResponse>(RouteEndpoints.CATEGORY);
  }

  fetchCategoryById(categoryId: number): Observable<CategoryResponse> {
    return this.httpService.getById<CategoryResponse>(categoryId, RouteEndpoints.CATEGORY);
  }

  fetchCurrentUserDetails(currentUserId: number): Observable<UserDetails> {
    return this.httpService.getById<UserDetails>(currentUserId, RouteEndpoints.USER + '/Id')
  }

  fetchCurrentEvent(currentEventId: number): Observable<IEvent> {
    return this.httpService.getById<IEvent>(currentEventId, RouteEndpoints.EVENT);
  }
  
  postEvent(event: IEvent): Observable<IEvent> {
    return this.httpService.post<IEvent>(event, RouteEndpoints.EVENT).pipe(
      catchError(this.httpService.handleHttpErrorResponse)
    )
  }

  updateEvent(event: IEvent): Observable<IEvent> {
    return this.httpService.update<IEvent>(event, RouteEndpoints.EVENT).pipe(
      catchError(this.httpService.handleHttpErrorResponse)
    )
  }
}
