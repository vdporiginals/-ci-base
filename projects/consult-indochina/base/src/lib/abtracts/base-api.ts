import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] } | undefined;
  observe?: 'body' | undefined;
  body?: Record<string, unknown> | unknown | undefined;
  params?: Record<string, any> | HttpParams | undefined;
  reportProgress?: boolean | undefined;
  responseType?: 'json' | undefined;
  withCredentials?: boolean | undefined;
}

export interface BaseResponse<T> {
  ok: boolean | undefined;
  message?: string | undefined;
  payload: T;
  count?: number | undefined;
}

export abstract class BaseApiService<T> {
  private httpOptions: HttpOptions | undefined;
  constructor(
    protected readonly http: HttpClient,
    protected readonly actionUrl: string
  ) {}

  list(
    params?: Record<string, any>,
    headers?: HttpHeaders
  ): Observable<BaseResponse<T[]>> {
    this.httpOptions = {
      params,
      headers,
    };
    return this.http.get<BaseResponse<T[]>>(
      `${this.actionUrl}`,
      this.httpOptions
    );
  }

  detail(
    id: unknown,
    params?: Record<string, any>,
    headers?: HttpHeaders
  ): Observable<BaseResponse<T>> {
    this.httpOptions = {
      params,
      headers,
    };
    return this.http.get<BaseResponse<T>>(
      `${this.actionUrl}/${id}`,
      this.httpOptions
    );
  }

  create(
    data: Partial<T>,
    params?: Record<string, any>,
    headers?: HttpHeaders
  ): Observable<BaseResponse<T>> {
    this.httpOptions = {
      params,
      headers,
    };

    return this.http.post<BaseResponse<T>>(
      `${this.actionUrl}`,
      data,
      this.httpOptions
    );
  }

  update(
    data: Partial<T>,
    id: unknown,
    params?: Record<string, any>,
    headers?: HttpHeaders
  ): Observable<BaseResponse<T>> {
    this.httpOptions = {
      params,
      headers,
    };

    return this.http.put<BaseResponse<T>>(
      `${this.actionUrl}/${id}`,
      data,
      this.httpOptions
    );
  }

  delete(
    id?: unknown,
    params?: Record<string, any>,
    databody?: Record<string, unknown>,
    headers?: HttpHeaders
  ): Observable<BaseResponse<T>> {
    this.httpOptions = {
      params,
      body: databody,
      headers,
    };
    return this.http.delete<BaseResponse<T>>(
      `${this.actionUrl}/${id}`,
      this.httpOptions
    );
  }
}
