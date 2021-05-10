# Base CI Frontend Angular

Thư Viện gồm các Base components, Base abtracts class, Service

## Components

**_Search Components:_**
`<ci-search></ci-search>`

- Input:

```
 + listItemClient: Truyền vào list item cần tìm kiếm ,
 + searchParams: truyền vào params(property) tìm kiếm,
 + cssClass: truyền vào style custom input,
 + debounceTime: truyền vào thời gian delay khi nhả phím (ms),
 + searchUrl: tìm kiếm severside url,
 + params: params tìm kiếm serverside url,
```

- Output:

```
 + searchItemsClient: list item tim kiem dưoc ,
 + searchItemsServer: list item tim kiem duoc serverside,
```

- Demo how to use

```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CiSearchInputComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

```
<ci-search
[cssClass]="'abc'"
[searchParams]="'keyword'"
[listItemClient]="
 [
  {keyword: 'Con cá',title: 'abc'},
  {keyword: 'lừu đạn',title: 'abc'},
  {keyword: 'vãi lúa',title: 'abc'},
  {keyword: 'ối dồi ơi',title: 'abc'},
  {keyword: 'đông ý',title: 'abc'}
 ]"
(searchItemsClient)="test($event)"
(searchItemsServer)="test($event)" '
[params]="{keyword: 'abc',title: 'abc'}">
</ci-search>
```

**_List Components:_**

`<ci-list></ci-list>`

- Input:

```
currentPage
 + id: Id list dùng cho pagination (có hoặc ko),
 + items: list items,
 + itemPerPage: items mỗi page cho pagination (có hoặc ko),
 + totalItem: tổng số các item cho pagination (có hoặc ko),
```

- Output: Tạm thời chưa có

- Demo how to use

```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CiListComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

```
<ci-list
  [id]="'asf'"
  [items]="items"
  [itemPerPage]="1"
  [page]="currentPage"
  [totalItem]="3"
>
  <ng-template #item let-item="item">
    <div>
      <p>ad {{ item }}</p>
    </div>
  </ng-template>
  <ng-template #pagination let-item="pagination"> // Thêm nếu dùng pagination
    <ci-pagination
      [cssClass]="'adoaiopsfj'"
      [id]="'asf'"
      (pageChange)="currentPage = $event; callApiServerSide($event)"
    ></ci-pagination>
  </ng-template>
</ci-list>

```

**_*Pagination Components:*_**

`<ci-pagination></ci-pagination>`

- Input:

```
currentPage
 + id: Id định nghĩa pagination(trùng với id của list component or paginate pipe của ngxPagination) (có hoặc ko),
 + cssClass: class wrap cho pagination,
 + itemPerPage: items mỗi page cho pagination (có hoặc ko),
 + totalItem: tổng số các item cho pagination (có hoặc ko),
```

- Output:

```
 + pageChange: sự kiện khi page thay đổi;
```

- Demo how to use
  Link

```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CiPaginationComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

```
<ci-pagination
      [cssClass]="'adoaiopsfj'"
      [id]="'asf'"
      (pageChange)="currentPage = $event; callApiServerSide($event)"
    >
</ci-pagination>
// (Dùng với list xem bên trên)
```

- [Ngx-Pagination demo](http://michaelbromley.github.io/ngx-pagination/#/server-paging)
