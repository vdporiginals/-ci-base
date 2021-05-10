import { Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { CiAuthService } from '../data-access/api/auth.service';
import {
  AuthState,
  LoginData,
} from '../data-access/models/auth-response.interface';

@Directive()
export abstract class Login {
  constructor(public readonly authService: CiAuthService) {}

  login(data: LoginData): Observable<AuthState> {
    return this.authService.login(data);
  }
}
