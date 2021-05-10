import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CiAuthModule } from '../../ci-auth.module';
import { AuthConfig } from '../../config/auth-config.interface';
import { AUTH_CONFIG } from '../../config/auth.config';
import { UserInterface } from '../models/user.model';

@Injectable({
  providedIn: CiAuthModule,
})
export class CiAccountService {
  API_URL: string;
  constructor(
    @Inject(AUTH_CONFIG) private authConfig: AuthConfig,
    private http: HttpClient
  ) {
    // console.log(this.authConfig.API_URL);
    this.API_URL = `${this.authConfig.API_URL}`;
  }

  getUserInfo(): Observable<UserInterface> {
    return this.http
      .get<UserInterface>(this.API_URL + '/catalog/profile')
      .pipe(map((res: any) => res.payload));
  }
}
