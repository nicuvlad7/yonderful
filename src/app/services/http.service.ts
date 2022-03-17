import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {

  }
  
  makeUserHttpRequest(requestName: string, requestBody?: any, ...pathParameters: string[]): Observable<any> {
    const requestUrl: string = this.buildUrlPath(...pathParameters);

    const headers = new HttpHeaders( {
      'Content-Type': 'applicaton/json'
    })

    switch (requestName) {
      case 'post': return this.userPostRequest(requestUrl, requestBody, headers);
      default:  return throwError( () => new Error('Invalid Http Request.'));
    }

  }

  private userPostRequest(requestUrl: string, requestBody?: any, headers?: any): Observable<any> {
    return this.httpClient.post<User>(requestUrl, requestBody, headers);
  }

  private buildUrlPath(...pathParameters: string[]): string {
    const path: string = pathParameters.reduce((previous, current) => { return previous + '/' + current });
    
    return environment.apiUrl + path;
  }

  handleHttpErrorResponse(error: HttpErrorResponse): Observable<any> {
    var errorMessage: string = `Error status ${error.status}: ${error.message}`;

    return throwError(() => new Error(errorMessage));
  }

  
}
