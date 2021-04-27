import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthConfig } from '../../config/auth-config.interface';
import { AUTH_CONFIG } from '../../config/auth.config';
import { AuthState, LoginData } from '../models/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CiSecurityService {
  API_URL: string;
  constructor(
    @Inject(AUTH_CONFIG) private authConfig: AuthConfig,
    private http: HttpClient
  ) {
    this.API_URL = `${this.authConfig.AUTH_URL}`;
  }

  requestAccessToken(data: LoginData): Observable<AuthState> {
    return this.http
      .post<AuthState>(this.API_URL, data)
      .pipe(map((res: any) => res.payload as AuthState));
  }

  refresh(token: any) {
    return token;
  }

  register() {}

  getMe() {}
}
