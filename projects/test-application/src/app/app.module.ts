import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CiAuthModule, CiLoginComponentModule } from '@consult-indochina/auth';
import { CiTableModule } from 'projects/consult-indochina/common/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
// import { HomeComponent } from './home/home.component';
import { InputComponent } from './home/input/input.component';
import { LoginComponent } from './login/login.component';
let getToken2;
// new CiAuthStateService().select('AccessToken').subscribe((res) => {
//   console.log(res);
// });
@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
    InputComponent,
    DynamicFormsComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CiTableModule,
    // CiPaginationComponentModule,
    // CiListComponentModule,
    // CiSearchInputComponentModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    // CiMessageTextModule,
    // CiMessageListModule,
    HttpClientModule,
    AppRoutingModule,
    // CiWebsocketModule.forRoot(
    //   {
    //     RECONNECT_INTERVAL: 5000,
    //     WS_ENDPOINT:
    //       'wss://7o5p7mfv40.execute-api.ap-southeast-1.amazonaws.com/production',
    //   },
    //   {
    //     provide: ACCESS_TOKEN_PROVIDER,
    //     deps: [CiAuthStateService],
    //     useFactory: accessTokenFactory,
    //   }
    // ),
    // CiAuthModule.forRoot({
    //   API_URL:
    //     'https://t39b2wqe1h.execute-api.ap-southeast-1.amazonaws.com/prod',
    // }),
    CiLoginComponentModule,
    CiAuthModule.forRoot({
      API_URL:
        'https://t39b2wqe1h.execute-api.ap-southeast-1.amazonaws.com/prod',
      PermissionNames: [],
      uiOption: 'custom'
    }),
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CiAuthInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // constructor(public stateService: CiAuthStateService) {
  //   getToken2 = stateService.token$;
  // }
}
