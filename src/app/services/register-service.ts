import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { 

  }

  register(user: User): Observable<User>{
    return this.httpClient.post<User>(environment.apiUrl + "users", user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    var errorMessage: string = `Error status ${error.status}: ${error.message}`;

    return throwError(() => new Error(errorMessage)); 
  }
}