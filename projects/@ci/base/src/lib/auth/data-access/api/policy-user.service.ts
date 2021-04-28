import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthConfig } from '../../config/auth-config.interface';
import { AUTH_CONFIG } from '../../config/auth.config';

@Injectable({
  providedIn: 'root',
})
export class CiPolicyUserService {
  API_URL: string;
  constructor(
    @Inject(AUTH_CONFIG) private authConfig: AuthConfig,
    private http: HttpClient
  ) {
    this.API_URL = `${this.authConfig.AUTH_URL}`;
  }

  retrievePermissionsForUser(): Observable<any> {
    return this.http
      .get<any>(this.API_URL)
      .pipe(map((res: any) => res.payload as any));
  }
}
