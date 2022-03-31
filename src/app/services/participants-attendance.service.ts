import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root',
})
export class ParticipantsAttendanceService {
	constructor(private httpService: HttpService) {}
    //to-do:
    //once the attendance table is merged into master,come back here and configure the right links,
    //data type for the participants/attendance
	deleteParticipant(id: number): Observable<User> {
		return this.httpService
			.delete<User>(id, `Attendance?attendanceId=`)
			.pipe(catchError(this.httpService.handleHttpErrorResponse));
	}

}
