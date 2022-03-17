import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers!: HttpHeaders;

  constructor(private httpClient: HttpClient) {

  }
  
  getAll<T>(endpoint: string): Observable<T[]> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint);

    return this.httpClient.get<T[]>(requestUrl, { headers: this.headers });
  }

  getById<T>(id: number, endpoint: string): Observable<T> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint) + '/' + id;

    return this.httpClient.get<T>(requestUrl, { headers: this.headers });
  }

  post<T>(input: any, endpoint: string): Observable<T> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint);

    return this.httpClient.post<T>(requestUrl, input, { headers: this.headers });
  }

  update<T>(input: any, endpoint: string): Observable<T> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint);

    return this.httpClient.put<T>(requestUrl, input, { headers: this.headers });
  }

  delete<T>(id: number, endpoint: string): Observable<T> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint) + '/' + id;

    return this.httpClient.delete<T>(requestUrl, { headers: this.headers });
  }

  private setRequestHeaders(): void {
    // TODO: set authorization token
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
  }

  private getRequestUrl(endpoint: string): string {
    return environment.apiUrl + endpoint;
  }

  handleHttpErrorResponse(error: HttpErrorResponse): Observable<any> {
    var errorMessage: string = `Error status ${error.status}: ${error.message}`;

    return throwError(() => new Error(errorMessage));
  }

  
}
