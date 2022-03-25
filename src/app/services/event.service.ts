import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from './http.service';
import {Event} from '../models/event'
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpService: HttpService) {}

  getEvent(eventId: number): Observable<Event> {
    return this.httpService
      .getById<Event>(eventId, 'Event')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
}
