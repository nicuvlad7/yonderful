import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { loginUser } from '../models/loginUser';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<loginUser>;
  public currentUser: Observable<loginUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<loginUser>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): loginUser {
    return this.currentUserSubject.value;
  }

  login(user: loginUser): Observable<loginUser> {
    return this.http.post<loginUser>(`${environment.apiUrl}Login`, user).pipe(
      map((user) => {
        // user.token= token;
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        console.log("Login succesful");
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({
      email: '',
      password: '',
    });
  }
}
