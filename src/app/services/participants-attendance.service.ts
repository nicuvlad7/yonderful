import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouteEndpoints } from '../models/constants';
import { UserDetails, User } from '../models/user';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root',
})
export class ParticipantsAttendanceService {
	constructor(private httpService: HttpService) {}

    //to-do:
    //once the attendance table is merged into master,come back here and configure the right links,
    //data type for the participants/attendance

	getParticipant(eventId: number): Observable<UserDetails[]>{
		return this.httpService
			.getById(eventId, RouteEndpoints.PARTICIPANTS_LIST)
			.pipe(catchError(this.httpService.handleHttpErrorResponse));
	}
    
	deleteParticipant(eventId: number, userId: number): Observable<User> {
		return this.httpService
			.deleteByTwoId<User>(eventId, userId, 'Attendance')
			.pipe(catchError(this.httpService.handleHttpErrorResponse));
	}

}
