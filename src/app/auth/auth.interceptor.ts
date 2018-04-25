import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/do';
import {ApiConfig} from '../config/api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
    if (ApiConfig.needAuthentication(request.url)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          throw Error(err.message);
        }
      }
    });
  }
}
