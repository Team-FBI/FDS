import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
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
        `Token ${authService.getTokenFromLocalStorage()}`
      )
    });

    return next.handle(clonedRequest);
  }
}
