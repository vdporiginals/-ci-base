import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, concat, defer, Observable, throwError } from 'rxjs';
import { catchError, mergeMap, retryWhen, take } from 'rxjs/operators';
import { CiAuthService } from '../data-access/api/auth.service';
import { RedirectService } from '../services/redirect.service';
import { AuthStateService } from '../data-access/store/auth-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private allowed = [
    '/cognito/register',
    '/cognito/confirm-signup',
    '/cognito/forgot-password',
    '/cognito/refresh-token',
    '/assets',
  ];

  constructor(
    private readonly authStateService: AuthStateService,
    private readonly authService: CiAuthService,
    private readonly redirectService: RedirectService
  ) {}

  private static addToken(req: HttpRequest<unknown>, token: unknown) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  private refreshToClonedRequest(req: HttpRequest<unknown>, next: HttpHandler) {
    return concat(
      this.authService.refreshToken(), // refresh token API Call
      this.newTokenToClonedRequest(req, next) // req = current request going out
    );
  }

  private newTokenToClonedRequest(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ) {
    return this.authStateService.token$.pipe(
      mergeMap((newToken) =>
        next.handle(AuthInterceptor.addToken(req, newToken))
      )
    );
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.allowed.some((url) => request.url.includes(url))) {
      // Allowed URLs do not need bearer token
      return next.handle(request);
    }

    let hasRetried = false;
    return combineLatest([
      this.authStateService.token$,
      this.authStateService.tokenExpiry$,
    ]).pipe(
      take(1),
      mergeMap(([token, expiry]) => {
        let curDate = new Date().getTime();
        if (!token) {
          // No token, just forward the request
          return next.handle(request);
        }

        const cloned = AuthInterceptor.addToken(request, token);
        return defer(() => {
          if (expiry && expiry - curDate <= 0) {
            return this.refreshToClonedRequest(request, next) as Observable<
              HttpEvent<unknown>
            >;
          }

          return next.handle(cloned).pipe(
            retryWhen((errObs) =>
              errObs.pipe(
                mergeMap((err: HttpErrorResponse) => {
                  if (err.status === 401 && !hasRetried) {
                    hasRetried = true;
                    return this.refreshToClonedRequest(
                      request,
                      next
                    ) as Observable<HttpEvent<unknown>>;
                  }
                  return throwError(err);
                })
              )
            )
          );
        }).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.authService.logout().subscribe({
                complete: () => {
                  this.redirectService.redirectToLogin();
                },
              });
            } else if (err.status === 403) {
              this.redirectService.redirectToNotAuthorized();
            }

            return throwError(err);
          })
        );
      })
    );
  }
}

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
