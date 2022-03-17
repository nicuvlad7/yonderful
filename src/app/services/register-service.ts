import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpService: HttpService) { 

  }

  register(user: User): Observable<User>{
    // In the case you need a more complex path, provide it following the template:
    // x/y/z will be sent in the method as separate arguments as ('x', 'y', 'z')
    // 
    return this.httpService.makeUserHttpRequest('post', user, 'users').pipe(
      catchError(this.httpService.handleHttpErrorResponse)
    );
  }

}