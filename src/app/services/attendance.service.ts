import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IAttendance } from '../models/attendance';
import { RouteEndpoints } from '../models/constants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpService: HttpService) {}

	addNewAttendance(attendance: IAttendance): Observable<IAttendance> {
		return this.httpService
			.post<IAttendance>(attendance, RouteEndpoints.ATTENDANCE)
			.pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
  
  getParticipantsForEvent(eventId: number): Observable<IAttendance> {
		return this.httpService
			.getById<IAttendance>(eventId, RouteEndpoints.ATTENDANCE)
			.pipe(catchError(this.httpService.handleHttpErrorResponse));
	}
}
