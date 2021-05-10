import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { CiAuthModule } from '../../ci-auth.module';
import { AuthState } from '../models/auth-response.interface';

@Injectable({
  providedIn: CiAuthModule,
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
