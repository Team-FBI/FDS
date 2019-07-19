import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authService = this.injector.get(AuthService);

    console.log(authService.getTokenFromLocalStorage());
    const clonedRequest = req.clone({
      headers: req.headers.set(
        'Authorization',
        `${authService.getTokenFromLocalStorage()}`
      )
    });

    return next.handle(clonedRequest);
  }
}
