import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newReq = request.clone({
      withCredentials: true,
      headers: request.headers.set('X-XSRF-TOKEN', this.cookieService.get('XSRF-TOKEN'))
        .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
        .set('Content-Type', 'application/json')
    });

    return next.handle(newReq);
  }
}
