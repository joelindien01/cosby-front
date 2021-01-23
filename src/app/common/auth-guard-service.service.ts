import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {UserService} from "./user.service";



@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  constructor(public router: Router, private userService: UserService) { }
}
