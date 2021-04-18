import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('username') && localStorage.getItem('basicauth')) {
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem('basicauth')
        }
      })
    }

    return next.handle(req);
  }

  constructor() { }
}
