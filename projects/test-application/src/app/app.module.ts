import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CiBaseModule } from '@ci/base';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './home/input/input.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
import { DynamicFormsQuestionComponent } from './dynamic-forms-question/dynamic-forms-question.component';
import {
  CiDirectiveModule,
  CiPipeModule,
} from 'projects/@ci/base/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputComponent,
    DynamicFormsComponent,
    DynamicFormsQuestionComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CiBaseModule,
    CiPipeModule,
    CiDirectiveModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
