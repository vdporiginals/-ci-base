import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface HttpOtions {
  headers?: HttpHeaders | { [header: string]: string | string[] } | undefined;
  observe?: 'body' | undefined;
  body?: unknown;
  params?: HttpParams | { [param: string]: string | string[] } | undefined;
  reportProgress?: boolean | undefined;
  responseType?: 'json' | undefined;
  withCredentials?: boolean | undefined;
}
export abstract class BaseApiService<T> {
  private httpOptions: HttpOtions | undefined;
  constructor(
    protected readonly http: HttpClient,
    protected readonly actionUrl: string
  ) {}

  list(params?: HttpParams): Observable<T[]> {
    this.httpOptions = {
      params,
    };
    return this.http
      .get(`${this.actionUrl}`, this.httpOptions)
      .pipe(map((res: any) => res.Payload));
  }

  detail(id: unknown, params?: HttpParams): Observable<T> {
    this.httpOptions = {
      params,
    };
    return this.http
      .get<T>(`${this.actionUrl}/${id}`, this.httpOptions)
      .pipe(map((res: any) => res.Payload));
  }

  create(
    data: Partial<T>,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    this.httpOptions = {
      params,
      headers,
    };

    return this.http.post<T>(`${this.actionUrl}`, data, this.httpOptions);
  }

  update(data: Partial<T>, id: unknown, params?: HttpParams): Observable<T> {
    this.httpOptions = {
      params,
    };
    return this.http.put<T>(`${this.actionUrl}/${id}`, data, this.httpOptions);
  }

  delete(id?: any, params?: HttpParams, databody?: unknown): Observable<T> {
    this.httpOptions = {
      params,
      body: databody,
    };
    return this.http.delete<T>(`${this.actionUrl}/${id}`, this.httpOptions);
  }
}
