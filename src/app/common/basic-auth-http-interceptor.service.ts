import { Injectable } from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {throwError} from "rxjs/index";
import {catchError, map} from "rxjs/internal/operators";
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

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError(error=>{
        let errorMsg = '';
        if(error.error.exception == "org.springframework.dao.DataIntegrityViolationException") {
          alert("Data Integrity issue, Please contact Tech team");
        } else if(error.error.exception == "java.lang.RuntimeException") {
          alert(error.error.message);
        }
        console.log(error);
        return Observable.throw(error.statusText);
      })
    );
  }

  constructor() { }
}
