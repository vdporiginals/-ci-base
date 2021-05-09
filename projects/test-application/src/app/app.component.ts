import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CiAuthService, CiAuthStateService, CiSecurityService } from '@ci/base';
import { finalize, pluck, take, withLatestFrom } from 'rxjs/operators';
import { PermissionStateService } from './services/permission-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test-application';
  textSearch: FormControl = new FormControl();
  // questions$!: Observable<CiBaseFormsModel<any>[]>;
  user = '';
  password = '';
  loginResponse: any;
  constructor(
    // private http: HttpClient,
    private readonly route: ActivatedRoute,
    // private readonly router: Router,
    // private ciAccountService: CiAccountService,
    private readonly ciAuthStateService: CiAuthStateService,
    private readonly authService: CiAuthService,
    private readonly secs: CiSecurityService,
    private readonly permissionStateService: PermissionStateService,
    // private readonly policyService: CiPolicyService // private readonly featureFlagService: FeatureFlagService, // private readonly pageTitleService: PageTitleService
  ) {}

  ngOnInit() {
    // this.secs
    //   .register({
    //     Email: 'vdp.originals@gmail.com',
    //     Password: '123456Abc',
    //     PhoneNumber: '',
    //     Type: 1,
    //     Status: 1,
    //     DateOfBirth: '',
    //     Username: 'abc',
    //   })
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
    this.secs.resendConfirmCode('abc').subscribe((res) => {
      console.log(res);
    });
    // this.secs.
    // this.secs
    //   .confirmSignUp({
    //     Username: 'abc',
    //     ConfirmationCode: '281034',
    //   })
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
    // this.ciAccountService.getUserInfo();
    // this.questions$ = this.setUpForms();
    this.setupRouteTitleListener();
    this.ciAuthStateService.currentUser$.subscribe((res) => {
      console.log(res);
    });
    this.authService.retrieveTokenOnPageLoad(); // setup authState
    this.ciAuthStateService.isAuthorized$.subscribe(() => {
      // this.policyService.loadPermissions(); // setup permissionState
      // this.featureFlagService.loadFeatures();
    });
  }

  private setupRouteTitleListener() {
    // this.router.events
    //   .pipe(filter((ev) => ev instanceof ResolveEnd))
    //   .subscribe((ev: ResolveEnd) => {
    //     this.pageTitleService.setPageTitleByRouteSnapshot(ev.state.root);
    //   });
  }

  searchItemsServer(ev: any) {
    console.log(ev);
  }

  login() {
    console.log(this.user);
    this.authService
      .login({
        Username: this.user,
        Password: this.password,
      })
      .pipe(
        withLatestFrom(
          this.route.queryParams.pipe(pluck('returnUrl'), take(1)),
          this.permissionStateService.permissionReady$
        ),
        finalize(() => {
          this.user = '';
          this.password = '';
        })
      )
      .subscribe({
        next: (res) => {
          this.loginResponse = res;
          // if (res.status === ApiResponseStatus.Success && ready) {
          //   this.router.navigate(['/dashboard']);
          // }
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  searchItemsClient(ev: any) {
    console.log(ev);
  }
}
