/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }
  public login(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    const body = `grant_type=${data.grant_type}&username=${data.username}&password=${data.password}`;

    return this.http
      .post<any>(
        `https://schoolbusapi.chuyendoisodn.com/Token`,
        body,
        httpOptions
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            //   this.toastService.showError('Sai tên tài khoản hoặc mật khẩu!');
          }
          return throwError(err);
        })
      );
  }
}
