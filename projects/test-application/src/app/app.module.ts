import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  accessTokenFactory,
  CiAuthInterceptor,
  CiAuthModule,
  CiAuthStateService,
} from '@consult-indochina/auth';
import { CiWebsocketModule, ACCESS_TOKEN_PROVIDER } from '@consult-indochina/websocket';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
// import { HomeComponent } from './home/home.component';O
import { InputComponent } from './home/input/input.component';
import { LoginComponent } from './login/login.component';
let getToken2;
// new CiAuthStateService().select('AccessToken').subscribe((res) => {
//   console.log(res);
// });
function initializeApp(ciAuthStateService: CiAuthStateService): any {
  return () => ciAuthStateService.reset();
}

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
    // CiTableModule,
    // FbChatDesignModule,
    // CiPaginationComponentModule,
    // CiListComponentModule,
    // CiSearchInputComponentModule,
    BrowserModule,
    ReactiveFormsModule,
    // FormsModule,
    // CiMessageTextModule,
    // CiMessageListModule,
    HttpClientModule,
    AppRoutingModule,

    CiWebsocketModule.forRoot(
      {
        RECONNECT_INTERVAL: 5000,
        WS_ENDPOINT:
          'wss://7o5p7mfv40.execute-api.ap-southeast-1.amazonaws.com/production',
      },
      {
        provide: ACCESS_TOKEN_PROVIDER,
        deps: [CiAuthStateService],
        useFactory: accessTokenFactory,
      }
    ),
    // CiAuthModule.forRoot({
    //   API_URL:
    //     'https://t39b2wqe1h.execute-api.ap-southeast-1.amazonaws.com/prod',
    // }),
    // CiLoginComponentModule,
    // CiAuthModule.forRoot({
    //   PermissionNames: [],
    //   uiOption: '',
    //   API_URL:
    //     'https://t39b2wqe1h.execute-api.ap-southeast-1.amazonaws.com/prod',
    // }),
  ],
  providers: [
      {
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [CiAuthStateService],
        multi: true,
      },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CiAuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // constructor(public stateService: CiAuthStateService) {
  //   getToken2 = stateService.token$;
  // }
}
