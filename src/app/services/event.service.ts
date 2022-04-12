import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpService } from './http.service';
import {EventsResponse, IEvent} from '../models/event'
import { RouteEndpoints } from '../models/constants';
import { IDashboardEvents } from '../models/dashboard-event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpService: HttpService) {}

  getEvent(eventId: number): Observable<IEvent> {
    return this.httpService
      .getById<IEvent>(eventId, RouteEndpoints.EVENT)
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }

  deleteEvent(id: number): Observable<IEvent> {
    return this.httpService
      .delete<IEvent>(id, RouteEndpoints.EVENT + '/')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }

  getFutureEvents(): Observable<EventsResponse> {
    return this.httpService
      .getAll<EventsResponse>(RouteEndpoints.FUTURE_EVENTS)
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }

  getDashboardEvents(hostId: number): Observable<IDashboardEvents> {
    return this.httpService
    .getById<IDashboardEvents>(hostId, RouteEndpoints.DASHBOARD_EVENTS)
    .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }

    getJoinedEventsForUser(userId: number): Observable<IEvent[]> {
        return this.httpService
            .getById<IEvent[]>(userId, RouteEndpoints.JOINED_EVENTS)
            .pipe(catchError(this.httpService.handleHttpErrorResponse));
    }
}
