# Base CI Frontend Angular

Thư Viện gồm các Base components, Base abtracts class, Service

## Pipes

**Currency Short Pipe**

- Dùng để chuyển đổi số lớn thành các prefix M,Tỷ,...
- Sử dụng trong template

```
  <p>{{ valueClicked | currencyShort}}</p>
```

- Sử dụng trong ts:
  Component:

```
 import { currencyShortPipe } from 'ci-base';
  constructor(private currencyShortPipe: currencyShortPipe) {
   let transformedValue = this.currencyShortPipe.transform(someValue);
  }
```

Module:

```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CiPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

**Sum total Pipe**

- Dùng để chuyển đổi số lớn thành các prefix M,Tỷ,...
- Sử dụng trong template

```
    Input vào 1 list object có chứa value number:
     <span>{{ item.LoanList | sumTotal:'Value' }} </span>
     ('Value' = Property của object cần tính)

    Hoặc input vào 1 list number:
     <span>{{ item.LoanList | sumTotal }} </span>
```

Module:

```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CiPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

**Text Overflow Pipe**

- Dùng để chuyển đổi các chuỗi dài.
- Sử dụng trong template

```
     {{ item.CustomerName | textOverflow: [15, "..."] }}
     Trong đó [15, "..."]:
      - 15 là số ký tự chuỗi được hiển thị.
      - "..." : prefix của chuỗi
```

Module:

```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CiPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

**Time Pipe**

- Dùng để chuyển đổi bộ đếm ngược sang phút:giây
- Sử dụng trong template

```
  <div class="timecount">
    {{ counterMinute | async | time }}
  </div>
```

- Trong component tạo vạo observable nhận vào timer 

```
 counterMinute: Observable<number> = timer(0, 1000).pipe(
    scan((acc) => --acc, 300),
    takeWhile((x) => {
      if (x <= 0) {
        this.isCompleteCounter = true;
      } else {
        this.isCompleteCounter = false;
      }
      return x >= 0;
    })
  );
```

Module:

```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CiPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```
