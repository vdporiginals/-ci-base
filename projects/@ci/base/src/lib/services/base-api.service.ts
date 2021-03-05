import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] } | undefined;
  observe?: 'body' | undefined;
  body?: unknown;
  params?: Params;
  reportProgress?: boolean | undefined;
  responseType?: 'json' | undefined;
  withCredentials?: boolean | undefined;
}
interface Params {
  [param: string]: string | string[];
}
export abstract class BaseApiService<T> {
  private httpOptions: HttpOptions | undefined;
  constructor(
    protected readonly http: HttpClient,
    protected readonly actionUrl: string
  ) {}

  list(params?: Params): Observable<T[]> {
    this.httpOptions = {
      params,
    };
    return this.http
      .get(`${this.actionUrl}`, this.httpOptions)
      .pipe(map((res: any) => res.Payload));
  }

  detail(id: unknown, params?: Params): Observable<T> {
    this.httpOptions = {
      params,
    };
    return this.http
      .get<T>(`${this.actionUrl}/${id}`, this.httpOptions)
      .pipe(map((res: any) => res.Payload));
  }

  create(
    data: Partial<T>,
    params?: Params,
    headers?: HttpHeaders
  ): Observable<T> {
    this.httpOptions = {
      params,
      headers,
    };

    return this.http.post<T>(`${this.actionUrl}`, data, this.httpOptions);
  }

  update(data: Partial<T>, id: unknown, params?: Params): Observable<T> {
    this.httpOptions = {
      params,
    };
    return this.http.put<T>(`${this.actionUrl}/${id}`, data, this.httpOptions);
  }

  delete(id?: any, params?: Params, databody?: unknown): Observable<T> {
    this.httpOptions = {
      params,
      body: databody,
    };
    return this.http.delete<T>(`${this.actionUrl}/${id}`, this.httpOptions);
  }
}
