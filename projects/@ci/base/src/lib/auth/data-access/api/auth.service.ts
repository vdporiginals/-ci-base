import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthConfig } from '../../config/auth-config.interface';
import { AUTH_CONFIG } from '../../config/auth.config';
import { AuthResponse, LoginData } from '../models/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CiAuthService {
  API_URL: string;
  constructor(
    @Inject(AUTH_CONFIG) private authConfig: AuthConfig,
    private http: HttpClient
  ) {
    this.API_URL = `${this.authConfig.AUTH_URL}`;
  }

  login(data: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL, data);
  }

  register() {}

  getMe() {}
}
