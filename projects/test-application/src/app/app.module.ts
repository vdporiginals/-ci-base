import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CiAuthModule, CiAuthStateService, CiLoginComponentModule } from '@consult-indochina/auth';
import {
  CiMessageListModule,
  CiMessageTextModule,
  CiWebsocketModule,
} from '@consult-indochina/websocket';
import { LocalStorageService } from 'dist/consult-indochina/auth/lib/services/local-storage.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
// import { HomeComponent } from './home/home.component';
import { InputComponent } from './home/input/input.component';
import { LoginComponent } from './login/login.component';
import { PermissionNames } from './services/pername';
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
    CiLoginComponentModule,
    CiAuthModule.forRoot({
      API_URL:
        'https://t39b2wqe1h.execute-api.ap-southeast-1.amazonaws.com/prod',
      PermissionNames: [],
      uiOption: 'custom'
    }),
    AppRoutingModule,
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
