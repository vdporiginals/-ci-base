import { CommonModule } from '@angular/common';
import { Component, Inject, Input, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../base/base-auth';
import { CiAuthModule } from '../../ci-auth.module';
import { AuthConfig } from '../../config/auth-config.interface';
import { AUTH_CONFIG } from '../../config/auth.config';
import { CiAuthService } from '../../data-access/api/auth.service';
import { CiSecurityService } from '../../data-access/api/security.service';

@Component({
  selector: 'ci-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class CiLoginComponent extends Auth implements OnInit {
  
  
  
  constructor(public authService: CiAuthService, public securityService: CiSecurityService, @Inject(AUTH_CONFIG) private authConfig: AuthConfig) {
    super(authService, securityService);
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
