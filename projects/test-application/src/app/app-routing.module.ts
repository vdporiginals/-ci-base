import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CiAuthGuard } from '@consult-indochina/auth';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LoginComponent,
  },
  // {
  //   path: '',
  //   component: Dynn
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
