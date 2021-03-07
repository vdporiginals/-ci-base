# Base CI Frontend Angular

Thư Viện gồm các Base components, Base abtracts class, Service

## Components
 ***Search Components:***

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
