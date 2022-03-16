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
    return this.httpClient.post<User>(environment.mockUrl + "users", user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    var errorMessage: string;
    if (error.status === 0) {
      // Client or network error;
      errorMessage = error.message;
    }
    else {
      // Backend unsuccessful response;
      errorMessage = error.status + ': server error occured';
    }

    return throwError(() => new Error(errorMessage)); 
  }
}