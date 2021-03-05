import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from '@ci/base';

@Injectable({
  providedIn: 'root',
})
export class TestService extends BaseApiService<{ Type: string }> {
  constructor(protected http: HttpClient) {
    super(http, 'api');
  }
}
