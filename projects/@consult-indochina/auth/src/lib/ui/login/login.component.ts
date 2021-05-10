import { Component, NgModule, OnInit } from '@angular/core';
import { Login } from '../../base/base-login';
import { CiAuthModule } from '../../ci-auth.module';
import { CiAuthService } from '../../data-access/api/auth.service';

@Component({
  selector: 'ci-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Login implements OnInit {
  constructor(public authService: CiAuthService) {
    super(authService);
  }

  ngOnInit(): void {}
}
@NgModule({
  declarations: [LoginComponent],
  imports: [CiAuthModule],
})
export class LoginComponentModule {}
