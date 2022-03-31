import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpService } from './http.service';
import {IEvent} from '../models/event'
import { RouteEndpoints } from '../models/constants';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpService: HttpService) {}

  getEvent(eventId: number): Observable<IEvent> {
    return this.httpService
      .getById<IEvent>(eventId, RouteEndpoints.EVENT)
      .pipe(map((response) => response.result),catchError(this.httpService.handleHttpErrorResponse));
  }

  deleteEvent(id: number): Observable<IEvent> {
    return this.httpService
      .delete<IEvent>(id, RouteEndpoints.EVENT + '/')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
}
