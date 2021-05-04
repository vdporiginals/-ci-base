import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  CiPaginationComponentModule,
  CiListComponentModule,
  CiSearchInputComponentModule,
  getAuthConfigProvider,
} from '@ci/base';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './home/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputComponent,
    DynamicFormsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CiPaginationComponentModule,
    CiListComponentModule,
    CiSearchInputComponentModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    getAuthConfigProvider({
      AUTH_URL:
        'https://t39b2wqe1h.execute-api.ap-southeast-1.amazonaws.com/prod',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
