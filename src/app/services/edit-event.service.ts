import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse } from '../models/category';
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

  fetchCurrentUserDetails(currentUserId: number): Observable<UserDetails> {
    // TODO: change with real api endpoint
    return this.httpService.getById<UserDetails>(currentUserId, "usersDetails")
  }

  fetchCurrentEvent(currentEventId: number): Observable<UserEvent> {
    // TODO: change with real api endpoint
    return this.httpService.getById<UserEvent>(currentEventId, "events");
  }
}
