import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Rx";
import {isUndefined} from "util";
import {UserAddForm} from "../user/add-user/add-user.component";
import {isDefined} from "@angular/compiler/src/util";

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
          this.connectedUser = userData;
          localStorage.setItem('username', JSON.stringify(this.connectedUser));
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
    return JSON.parse(localStorage.getItem("username"));
  }

  resetPassword(value: any) {
    return this.httpClient.post(this.baseUrl+'reset-password', value);
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

  userHasRole(roleName: string) {
    return true;
    /*const user: any = this.getConnectedUser();
    if(isUndefined(user)) {
      return false;
    }
    const userRoles = user.profile.roles.concat(user.roles);
    return userRoles.findIndex(role => role.name === roleName) > -1;*/
  }

  reloadCurrentUser(editedAccount: UserAddForm) {
    let response = this.httpClient.get<User>(this.baseUrl+'validate-login').pipe(
      map(user => {
        this.saveToLocalStorage(editedAccount, user);
      })
    );
    return response;
  }

  private saveToLocalStorage(editedAccount: UserAddForm, resultUser?: any) {
    this.connectedUser = resultUser;
    localStorage.setItem('username', JSON.stringify(this.connectedUser));
    if (isDefined(editedAccount.password)) {
      const basicauth = "Basic " + btoa(editedAccount.username + ':' + editedAccount.password);
      localStorage.setItem('basicauth', basicauth);
    }
  }

  validateToken(userId: any, token: string) {
    return this.httpClient.post<any>(this.baseUrl+'validate-token', {userId: userId, token: token, type: "PASSWORD_CHANGED"});
  }
}
