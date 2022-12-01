import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _login: LoginService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
  //  add the jwt token (localStorage) request
    let authReq = request;
    const token = this._login.getToken();
    if (token != null) {
      authReq = authReq.clone({
        setHeaders: {
          'Authorization':`Bearer ${token}`,
        }
      })
    }
    return next.handle(authReq);
  }
}

export const AuthInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];
