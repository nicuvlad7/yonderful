import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategoryCard } from '../models/category';



@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private http: HttpClient) {}
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
}
