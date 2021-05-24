import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { CommonConfig } from '../config/common-config.interface';
import { COMMON_CONFIG } from '../config/common.config';
import { nonAccentVietnamese } from '../utils/unicode-slug';

const myId = uuid.v4();
@Injectable({
  providedIn: 'root',
})
export class S3FileService {
  private http: HttpClient;
  S3_URL: string;
  constructor(
    protected readonly handler: HttpBackend,
    @Inject(COMMON_CONFIG) commonConfig: CommonConfig
  ) {
    this.S3_URL = commonConfig.S3_URL;
    this.http = new HttpClient(handler);
  }

  generatePresigned(file: { name: string; type: string; contentType: string }) {
    let valid = nonAccentVietnamese(file.name);
    let image = {
      ImageName: `${valid}-${myId}.${file.type}`,
      ImageContentType: file.contentType,
    };

    return this.http.post(this.S3_URL, image);
  }

  uploadImage(link: string, file: File, contentType: string) {
    return this.http.put(link, file, {
      headers: new HttpHeaders({
        'Content-Type': contentType,
      }),
    });
  }

  getLinkFile(link: string) {
    return link.substr(0, link.indexOf('?'));
  }
}
