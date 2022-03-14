import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategoryCard } from '../models/category-card';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  
  category: CategoryCard = {
    title: "Test"
  }
  constructor(private http: HttpClient) { }

  getCategory(title:string) : Observable<CategoryCard>{
    return this.http.get<CategoryCard>(environment.apiUrl + "/category/" + this.category.title)
  }
  
}
