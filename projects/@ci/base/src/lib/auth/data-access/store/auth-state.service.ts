import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { AuthResponse } from '../models/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService extends RxState<AuthResponse> {
  reset() {}
}
