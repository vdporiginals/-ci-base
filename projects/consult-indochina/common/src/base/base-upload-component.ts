import { Directive } from '@angular/core';
import { from, merge, Observable, of } from 'rxjs';
import { concatMap, switchMap, tap } from 'rxjs/operators';
import { S3FileService } from '../lib/services/s3-file.service';

@Directive()
export abstract class BaseUploadComponent {
  imageLinkUpload!: string;
  fileType!: string[];
  fileName!: string;

  constructor(public s3Service: S3FileService) {}
  selectImage(file: File[]): Observable<any> {
    this.fileType = file[0].name.split('.');
    this.fileName = file[0].name.substr(0, file[0].name.indexOf('.'));
    return this.s3Service
      .generatePresigned({
        contentType: file[0].type,
        name: this.fileName,
        type: this.fileType[this.fileType.length - 1],
      })
      .pipe(
        concatMap((res: any) => {
          this.imageLinkUpload = res.payload.substr(
            0,
            res.payload.indexOf('?')
          );
          return this.s3Service.uploadImage(res.payload, file[0], file[0].type);
        })
      );
  }

  multipleUpload(file: File[]): Observable<any> {
    let fileLinkList: string[] = [];
    return from(file).pipe(
      switchMap((f) => {
        let fileName = f.name.substr(0, file[0].name.indexOf('.'));
        let typeFile = f.name.split('.');
        return this.s3Service
          .generatePresigned({
            contentType: f.type,
            name: fileName,
            type: typeFile[typeFile.length - 1],
          })
          .pipe(
            concatMap((res: any) => {
              // fileLink = ;
              fileLinkList.push(
                res.payload.substr(0, res.payload.indexOf('?'))
              );
              return merge(
                of(fileLinkList),
                this.s3Service.uploadImage(res.payload, f, f.type)
              );
            })
          );
      })
    );
  }
}
