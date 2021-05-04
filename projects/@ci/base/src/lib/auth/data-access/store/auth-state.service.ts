import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { AuthState } from '../models/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService extends RxState<AuthState> {
  token$ = this.select('AccessToken');
  tokenExpiry$ = this.select('ExpiresIn');
  refreshToken$ = this.select('RefreshToken');
  // currentUser$ = this.select('user');
  isAuthorized$ = this.token$.pipe(map(Boolean));
  //   sideNavAuthInfo$ = this.currentUser$;

  get isAuthorized(): boolean {
    return !!this.get().AccessToken;
  }

  reset(): void {
    this.set({
      RefreshToken: '',
      refreshTokenExpiresIn: undefined,
      AccessToken: '',
      ExpiresIn: undefined,
      // user: null,
      //   checkAccountHideTransaction: false,
    });
  }
}
