import { CommonModule } from '@angular/common';
import { Component, Inject, Input, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../../base/base-login';
import { CiAuthModule } from '../../ci-auth.module';
import { AuthConfig } from '../../config/auth-config.interface';
import { AUTH_CONFIG } from '../../config/auth.config';
import { CiAuthService } from '../../data-access/api/auth.service';

@Component({
  selector: 'ci-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class CiLoginComponent extends Login implements OnInit {
  @Input() title!: string;
  @Input() classCustom!: string;
  uiOption!: string;
  loginForm = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl(''),
  });
  constructor(public authService: CiAuthService, @Inject(AUTH_CONFIG) private authConfig: AuthConfig) {
    super(authService);
    this.uiOption = this.authConfig.uiOption;
  }

  ngOnInit(): void {

  }

}
@NgModule({
  declarations: [CiLoginComponent],
  imports: [CommonModule,CiAuthModule, FormsModule, ReactiveFormsModule],
  exports: [CiLoginComponent]
})
export class CiLoginComponentModule {}
