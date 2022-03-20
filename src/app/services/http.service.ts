import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers!: HttpHeaders;

  constructor(private httpClient: HttpClient) {

  }
  
  getAll<T>(endpoint: string): Observable<T> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint);

    return this.httpClient.get<T>(requestUrl, { headers: this.headers });
  }

  getById<T>(id: number, endpoint: string): Observable<T> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint) + '/' + id;

    return this.httpClient.get<T>(requestUrl, { headers: this.headers });
  }

  getByStringProperty<T>(property:string, endpoint: string) : Observable<T> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint) + '/' + property;

    return this.httpClient.get<T>(requestUrl, { headers: this.headers });
  }

  post<T>(requestBody: any, endpoint: string): Observable<T> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint);

    return this.httpClient.post<T>(requestUrl, requestBody, { headers: this.headers});
  }

  update<T>(requestBody: any, endpoint: string): Observable<T> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint);

    return this.httpClient.put<T>(requestUrl, requestBody, { headers: this.headers });
  }
  
  deleteByProperty<T>(property: string, endpoint: string): Observable<T> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint) + '/' + property;

    return this.httpClient.delete<T>(requestUrl, { headers: this.headers });
  }

  delete<T>(id: number, endpoint: string): Observable<T> {
    this.setRequestHeaders();
    const requestUrl = this.getRequestUrl(endpoint) + '/' + id;

    return this.httpClient.delete<T>(requestUrl, { headers: this.headers });
  }

  private setRequestHeaders(): void {
    // TODO: set authorization token
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set("Access-Control-Allow-Origin", "*");
  }

  private getRequestUrl(endpoint: string): string {
    return environment.apiUrl + endpoint;
  }

  handleHttpErrorResponse(error: HttpErrorResponse): Observable<any> {
    var errorMessage: string = `Error status ${error.status}: ${error.error}`;
    return throwError(() => new Error(errorMessage));
  }

  
}