import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Rx";

class User {
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"user/";

  public invalidLogin = false;
  public connectedUser;
  constructor(private httpClient:HttpClient, private router: Router) {
  }

  authenticate(username, password) {
    const basicauth = "Basic "  + btoa(username + ':' + password);
    const headers = new HttpHeaders({ Authorization: basicauth });
    return this.httpClient.get<User>(this.baseUrl+'validate-login',{headers}).pipe(
      map(
        userData => {
          this.connectedUser = userData.username;
          localStorage.setItem('username', this.connectedUser);
          localStorage.setItem('basicauth', basicauth);
          return userData;
        }
      )
    );
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('username');
    return !(user === null);
  }
  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('basicauth');
    this.connectedUser = undefined;
    this.router.navigate(['login']);
  }

  checkLogin(username, password) {
    (this.authenticate(username, password).subscribe(
        data => {
          this.router.navigate(['customers']).then();
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
          this.router.navigate(['login']).then();
        }
      )
    );
  }

  registerUser(user) {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password), tag: "register"  });
    /*this.httpClient.get<User>(this.baseUrl+'validate-login',{headers}).subscribe(s=> {
      this.checkLogin(username, password);
    })*/
    return this.httpClient.post<any>(this.baseUrl+'register/', user);
  }

  getConnectedUser() {
    return localStorage.getItem("username");
  }

  resetPassword(value: string) {
    this.httpClient.post(this.baseUrl+'/reset-password', value).subscribe(s=> {

    });
  }

  findAllUsers():Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(this.baseUrl+'users');
  }

  backOfficeRegistration(user: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl+'bo-registration/', user);
  }

  findAllRoles():Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(this.baseUrl+'role/');
  }

  findAllProfiles():Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(this.baseUrl+'profile/');
  }

  saveProfile(profile: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl+'profile/', profile);
  }
}
