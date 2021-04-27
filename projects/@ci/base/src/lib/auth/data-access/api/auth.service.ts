import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from '@ci/base';
import {
  EMPTY,

  Observable,
  of,
  pipe,
  Subscription,
  throwError,
  timer
} from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthConfig } from '../../config/auth-config.interface';
import { AUTH_CONFIG } from '../../config/auth.config';
import { AuthResponse, LoginData } from '../models/auth-response.interface';
import { AuthStateService } from '../store/auth-state.service';
import { RedirectService } from './redirect.service';
import { CiSecurityService } from './security.service';

@Injectable({
  providedIn: 'root',
})
export class CiAuthService {
  private jwtSubscription: Subscription | undefined;
  API_URL: string;

  private afterRequestToken = () =>
    pipe(
      tap<AuthResponse>(({ RefreshToken, ExpiresIn }) => {
        this.localStorageService.set('rtok', RefreshToken);
        this.setupRefreshTimer(ExpiresIn);
      }),
      switchMap((tokenRequest: AuthResponse) => {
        const {
          AccessToken,
          RefreshToken,
          ExpiresIn,
          // refreshExpiresAt,
          // user,
        } = tokenRequest;
        this.authStateService.set({
          AccessToken,
          RefreshToken: RefreshToken!,
          ExpiresIn: ExpiresIn,
          // refreshTokenExpiry: refreshExpiresAt,
          // user,
        });
        // return forkJoin([
        //   of(tokenRequest),
        // this.accountsClient.checkAccountHideTransaction(
        //   tokenRequest.user?.accountId
        // ),
        // ]);
        return of(tokenRequest);
      })
      // map(([tokenRequest]) => {
      //   this.authStateService.set({ checkAccountHideTransaction });
      //   return tokenRequest;
      // })
    );

  constructor(
    @Inject(AUTH_CONFIG) private readonly authConfig: AuthConfig,
    // private http: HttpClient,
    private readonly authStateService: AuthStateService,
    private readonly localStorageService: LocalStorageService,
    private readonly redirectService: RedirectService,
    private readonly securityService: CiSecurityService
  ) {
    this.API_URL = `${this.authConfig.AUTH_URL}`;
  }

  login(data: LoginData): Observable<AuthResponse> {
    return this.securityService
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

  refreshToken() {
    const token = this.localStorageService.get('rtok');
    if (!token) {
      this.authStateService.reset();
      this.redirectService.redirectToLogin();
      return EMPTY;
    }

    return this.securityService.refresh({ token }).pipe(
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
    const diffInMilli = expiresIn - 1000 * 60;
    // Reset the timer if there's already one running
    this.jwtSubscription?.unsubscribe();

    // Setup timer
    this.jwtSubscription = timer(diffInMilli)
      .pipe(switchMap(this.refreshToken.bind(this)))
      .subscribe();
  }

  register() {}

  getMe() {
    return this.securityService.getMe();
  }
}
