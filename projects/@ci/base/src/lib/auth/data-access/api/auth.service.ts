import { Injectable } from '@angular/core';
import {
  EMPTY,
  forkJoin,
  Observable,
  of,
  pipe,
  Subscription,
  throwError,
  timer,
} from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../../services/local-storage.service';
import { RedirectService } from '../../services/redirect.service';
import { AuthState, LoginData } from '../models/auth-response.interface';
import { AuthStateService } from '../store/auth-state.service';
import { CiSecurityService } from './security.service';

@Injectable({
  providedIn: 'root',
})
export class CiAuthService {
  private jwtSubscription: Subscription | undefined;
  private afterRequestToken = () =>
    pipe(
      tap<AuthState>(({ RefreshToken, ExpiresIn }) => {
        console.log(RefreshToken, ExpiresIn);

        if (RefreshToken) {
          this.localStorageService.set('rtok', RefreshToken);
        }
        if (ExpiresIn) {
          this.setupRefreshTimer(ExpiresIn);
        }
      }),
      switchMap((tokenRequest) => {
        console.log(tokenRequest);
        const {
          AccessToken,
          RefreshToken,
          ExpiresIn,
          refreshTokenExpiresIn,
          // user,
        } = tokenRequest;
        this.authStateService.set({
          AccessToken,
          RefreshToken: RefreshToken!,
          ExpiresIn,
          refreshTokenExpiresIn,
          // user,
        });
        return forkJoin([
          of(tokenRequest),
          // this.accountsClient.checkAccountHideTransaction(
          //   tokenRequest.user?.accountId
          // ),
        ]);
      }),
      map(([tokenRequest]) => {
        // this.authStateService.set({ checkAccountHideTransaction });
        return tokenRequest;
      })
    );

  constructor(
    private readonly authStateService: AuthStateService,
    private readonly localStorageService: LocalStorageService,
    private readonly redirectService: RedirectService,
    private readonly securityClient: CiSecurityService // private readonly accountsClient: AccountsClient
  ) {}

  login(data: LoginData): Observable<AuthState> {
    return this.securityClient
      .requestAccessToken(data)
      .pipe(this.afterRequestToken());
  }

  logout(): Observable<never> {
    this.localStorageService.remove('rtok');
    this.authStateService.reset();
    this.jwtSubscription?.unsubscribe();
    return EMPTY;
  }

  retrieveTokenOnPageLoad(): void {
    this.refreshToken().subscribe();
  }

  refreshToken(): Observable<never> | Observable<AuthState> {
    const token = this.localStorageService.get('rtok');
    console.log(token);

    if (!token || token == 'undefined' || token == 'null') {
      this.authStateService.reset();
      // this.redirectService.redirectToLogin();
      return EMPTY;
    }

    return this.securityClient.refresh(token).pipe(
      catchError((err: any) => {
        if (err.status === 401) {
          // do something if refreshToken is unauthorized.
          // This means there's no refreshToken in localStorage
          this.redirectService.redirectToLogin();
        }
        // do more
        this.authStateService.reset();
        return throwError(err);
      }),
      this.afterRequestToken()
    );
  }

  private setupRefreshTimer(expiresIn: number) {
    const diffInMilli = expiresIn - 60;
    // Reset the timer if there's already one running
    this.jwtSubscription?.unsubscribe();

    // Setup timer
    this.jwtSubscription = timer(diffInMilli * 1000)
      .pipe(switchMap(this.refreshToken.bind(this)))
      .subscribe();
  }
}
