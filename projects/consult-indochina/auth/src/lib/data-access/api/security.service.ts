import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CiAuthModule } from '../../ci-auth.module';
import { AuthConfig } from '../../config/auth-config.interface';
import { AUTH_CONFIG } from '../../config/auth.config';
import { AuthState, LoginData } from '../models/auth-response.interface';
import { RegisterUser } from '../models/register.model';

@Injectable({
  providedIn: CiAuthModule,
})
export class CiSecurityService {
  API_URL: string;
  http: HttpClient;
  constructor(
    @Inject(AUTH_CONFIG) private authConfig: AuthConfig,
    public httpBack: HttpBackend
  ) {
    // console.log(this.authConfig.API_URL);

    this.API_URL = `${this.authConfig.API_URL}`;
    this.http = new HttpClient(httpBack);
  }

  requestAccessToken(data: LoginData): Observable<AuthState> {
    // console.log(data);

    return this.http
      .post<AuthState>(this.API_URL + '/cognito/login', data, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(map((res: any) => res.payload as AuthState));
  }

  refresh(token: string) {
    return this.http
      .post<AuthState>(
        `${this.API_URL}/cognito/refresh-token`,
        {
          RefreshToken: token,
        },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .pipe(map((res: any) => res.payload));
  }

  register(body: RegisterUser) {
    return this.http.post(`${this.API_URL}/cognito/register`, body);
  }

  confirmSignUp(body: { Username: string; ConfirmationCode: string | number }) {
    return this.http.post(`${this.API_URL}/cognito/confirm-signup`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  resendConfirmCode(username: string) {
    return this.http.put(`${this.API_URL}/cognito/confirm-signup`, {
      Username: username,
    });
  }

  forgotPassword(username: string) {
    return this.http.post(
      `${this.API_URL}/cognito/forgot-password`,
      {
        Username: username,
      },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  confirmForgotPassword(body: {
    Username: string;
    ProposedPassword: string;
    ConfirmationCode: string | number;
  }) {
    return this.http.put(`${this.API_URL}/cognito/forgot-password`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}
