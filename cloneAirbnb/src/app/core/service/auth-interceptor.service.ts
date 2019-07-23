import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);

    if (!authService.getTokenFromLocalStorage()) {
      const clonedRequestWithoutToken = req.clone({});

      return next.handle(clonedRequestWithoutToken);
    } else {
      const clonedRequest = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Token ${authService.getTokenFromLocalStorage()}`
        )
      });

      return next.handle(clonedRequest);
    }
  }
}
