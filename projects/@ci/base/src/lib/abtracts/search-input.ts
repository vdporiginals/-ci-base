import { HttpClient } from '@angular/common/http';
import { Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

export class SearchInputParams<T> {
  textSearch: FormControl = new FormControl();
  listItemClient: T[] = [];
  searchParams: string = 'keyword';
  debounceTime: number = 1000;
  searchUrl: string = '';
}

export abstract class SearchInputComponent<T> {
  constructor(private readonly http: HttpClient) {}
  @Input() searchInputParams: SearchInputParams<T> = new SearchInputParams();

  @Output() public searchItemsClient: Observable<T> = this.search$().pipe(
    distinctUntilChanged(),
    debounceTime(this.searchInputParams.debounceTime),
    switchMap((val) => {
      //   this.params[this.searchParams] = val;
      return this.searchInputParams.listItemClient.filter(
        (a) => this.params[this.searchInputParams.searchParams] === val
      );
    })
  );

  @Output() public searchItemsServer: Observable<T[]> = this.search$().pipe(
    distinctUntilChanged(),
    debounceTime(this.searchInputParams.debounceTime),
    switchMap((val) => {
      this.params[this.searchInputParams.searchParams] = val;
      return this.http.get<T[]>(this.searchInputParams.searchUrl, {
        params: this.params,
      });
    })
  );

  private params: any = {};

  private search$(): Observable<FormControl> {
    return this.searchInputParams.textSearch.valueChanges;
  }
}
