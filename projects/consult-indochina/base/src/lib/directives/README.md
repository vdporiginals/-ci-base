# Base CI Frontend Angular

Thư Viện gồm các Base components, Base abtracts class, Service

## Directives

**Only Number Directive**

- Dùng trong input chỉ chấp nhận gõ số

```
<input type="text" [OnlyNumber]="true">
```

Module:

```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CiDirectiveModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```
