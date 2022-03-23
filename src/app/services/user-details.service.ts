import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private httpService: HttpService) {}
  

  getAllUsers(): Observable<any> {
    return this.httpService
      .getAll<any>('User')
      .pipe(catchError(this.httpService.handleHttpErrorResponse));
  }
}
