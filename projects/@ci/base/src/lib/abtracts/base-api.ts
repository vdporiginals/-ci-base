import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] } | undefined;
  observe?: 'body' | undefined;
  body?: Record<string, unknown> | unknown | undefined;
  params?: Record<string, any> | HttpParams | undefined;
  reportProgress?: boolean | undefined;
  responseType?: 'json' | undefined;
  withCredentials?: boolean | undefined;
}

interface BaseResponse<T> {
  Ok: boolean | undefined;
  Message: string | undefined;
  Payload?: T | undefined;
  Count?: number | undefined;
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
    return this.http
      .get<Record<string, BaseResponse<T[]>>>(
        `${this.actionUrl}`,
        this.httpOptions
      )
      .pipe(map((res: Record<string, BaseResponse<T[]>>) => res.Payload));
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
    return this.http
      .get<Record<string, BaseResponse<T>>>(
        `${this.actionUrl}/${id}`,
        this.httpOptions
      )
      .pipe(map((res: Record<string, BaseResponse<T>>) => res.Payload));
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
