import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RxState } from '../../base/rx-state';
import { AuthState } from '../models/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CiAuthStateService extends RxState<AuthState> {
  token$ = this.select('AccessToken');
  tokenExpiry$ = this.select('ExpiresIn');
  tokenExpiryDate$ = this.select('ExpireDate');
  refreshToken$ = this.select('RefreshToken');
  currentUser$ = this.select('user');
  isAuthorized$ = this.token$.pipe(map(Boolean));
  //   sideNavAuthInfo$ = this.currentUser$;

  get isAuthorized(): boolean {
    return !!this.get().AccessToken;
  }
  abc() {}
  reset(): void {
    this.set({
      RefreshToken: '',
      refreshTokenExpiresIn: undefined,
      AccessToken: '',
      ExpiresIn: undefined,
      user: null,
      ExpireDate: undefined,
      //   checkAccountHideTransaction: false,
    });
  }
}
