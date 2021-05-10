import { Component, NgModule, OnInit } from '@angular/core';
import { CiAuthModule } from '../../ci-auth.module';

@Component({
  selector: 'ci-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [RegisterComponent],
  imports: [CiAuthModule]
 })
 export class RegisterComponentModule {}
