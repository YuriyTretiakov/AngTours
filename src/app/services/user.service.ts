import { Injectable } from '@angular/core';
import { IUser, IUserRegister } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable } from 'rxjs';
import { IApi } from '../models/iapi';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: IUser | null = null;
  
  constructor(private http: HttpClient) { }



  registerUser(user: IUserRegister): Observable<string> {
    return this.http.post(API.registration, user, {responseType: 'text'});
  }

  authUser(user: IUser): Observable<string> {
    return this.http.post(API.auth, user,{responseType: 'text'});
  }
  getUser(): IUser {
    return this.currentUser || JSON.parse(sessionStorage.getItem('login'));
  }

  setNewUserPassword(user: IUser): Observable<string> {
    return this.http.post(API.newPasswordSetting, user, {responseType: 'text'});
  }

  setUser(user: IUser): void {
    this.currentUser = user;
    if (user !== null) {
      sessionStorage.setItem('login', JSON.stringify(user.login));
    } else {
      sessionStorage.setItem('login', '');
    }
    console.log(sessionStorage)
  }

  setSessionStorageLogin(user: IUser | null): void {
    sessionStorage.setItem('login', user.login);
  }

}
