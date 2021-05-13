import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CiAuthModule, CiAuthStateService } from '@consult-indochina/auth';
import {
  CiMessageListModule,
  CiMessageTextModule,
  CiWebsocketModule,
} from '@consult-indochina/websocket';
import { LocalStorageService } from 'dist/consult-indochina/auth/lib/services/local-storage.service';
import { FbChatDesignModule } from 'projects/consult-indochina/websocket/src/public-api';
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
    // CiPaginationComponentModule,
    // CiListComponentModule,
    // CiSearchInputComponentModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CiMessageTextModule,
    CiMessageListModule,
    HttpClientModule,
    FbChatDesignModule,
    CiWebsocketModule.forRoot({
      ACCESS_TOKEN: JSON.parse(localStorage.getItem('access_token') as any)
        .access_token,
      ACCESS_TOKEN$: getToken2,
      RECONNECT_INTERVAL: 5000,
      WS_ENDPOINT:
        'wss://7o5p7mfv40.execute-api.ap-southeast-1.amazonaws.com/production',
    }),
    AppRoutingModule,
    CiAuthModule.forRoot({
      PermissionNames: [],
      API_URL:
        'https://t39b2wqe1h.execute-api.ap-southeast-1.amazonaws.com/prod',
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
  constructor(public stateService: CiAuthStateService) {
    getToken2 = stateService.token$;
  }
}
