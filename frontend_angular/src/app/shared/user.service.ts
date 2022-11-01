import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  
  constructor(private http: HttpClient,private cookieService: CookieService ) { }

  postRequestForNewUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/signup',user,this.noAuthHeader); // no need of token so no auth
  }

  login(authCredentials:any) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile'); // this req will require jwt token auth
  }


  //Helper Methods
  setToken(token: string) {
    localStorage.setItem('JWTtoken', token);
    // this.cookieService.set('JWTtoken', token);
  }

  getToken() {
    return localStorage.getItem('JWTtoken');
    // return this.cookieService.get('JWTtoken');
  }

  deleteToken() {
    localStorage.removeItem('JWTtoken');
    //  this.cookieService.delete('JWTtoken');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]); // atob() function is for decrypt token's payload and it is after . 1st perameter and last or sigunature code can not be decrypt only 1st and 2nd 
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload){
      return userPayload.exp > Date.now() / 1000; // return false token expity time is over if not then true 
    }
    else{
      return false;
    }
  }
}
