import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './abtracts';

@Injectable({
  providedIn: 'root',
})
export class BaseService extends BaseApiService<{Type: string}>{
  constructor(http: HttpClient) {
    super(http,'')
  }
}
