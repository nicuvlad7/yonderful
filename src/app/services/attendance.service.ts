import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IAttendance } from '../models/attendance';
import { RouteEndpoints } from '../models/constants';
import { UserDetails } from '../models/user';
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
  
  	getParticipantsForEvent(eventId: number): Observable<UserDetails[]> {
		return this.httpService
			.getById<UserDetails[]>(eventId, RouteEndpoints.ATTENDANCE_GET_PARTICIPANTS)
			.pipe(catchError(this.httpService.handleHttpErrorResponse));
	}

	deleteAttendance(eventId: number, userId: number): Observable<IAttendance> {
		return this.httpService
			.deleteByTwoId<IAttendance>(eventId, userId, RouteEndpoints.ATTENDANCE)
			.pipe(catchError(this.httpService.handleHttpErrorResponse));
	}
}
