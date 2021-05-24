import { Directive, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CiAuthService } from '../data-access/api/auth.service';
import { CiSecurityService } from '../data-access/api/security.service';
import {
  AuthState,
  LoginData,
} from '../data-access/models/auth-response.interface';
import { RegisterUser } from '../data-access/models/register.model';

@Directive()
export abstract class Auth {
  @Input() title!: string;
  @Input() classCustom!: string;
  uiOption!: string;
  loginForm = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl(''),
  });

  registerForm = new FormGroup({
    Email: new FormControl(''),
    Username: new FormControl(''),
    Password: new FormControl(''),
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    PhoneNumber: new FormControl(''),
    DateOfBirth: new FormControl(''),
    MediaURL: new FormControl(''),
  });
  constructor(
    public readonly authService: CiAuthService,
    public readonly securityService: CiSecurityService
  ) {}

  login(data: LoginData): Observable<AuthState> {
    return this.authService.login(data);
  }

  logout() {
    return this.authService.logout();
  }

  signup(data: RegisterUser) {
    return this.securityService.register(data);
  }
}
