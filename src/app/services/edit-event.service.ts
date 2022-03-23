import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse } from '../models/category';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EditEventService {

  constructor(private httpService: HttpService) { }

  fetchAllCategories(): Observable<CategoriesResponse> {
    return this.httpService.getAll<CategoriesResponse>('Category');
  }
}
