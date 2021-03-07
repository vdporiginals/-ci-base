import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CiBaseModule } from '@ci/base';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './home/input/input.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, InputComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CiBaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
