import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStateService, CiAuthService } from '@ci/base';
import { Observable, of } from 'rxjs';
import { withLatestFrom, pluck, take, finalize } from 'rxjs/operators';
import { PermissionStateService } from './services/permission-state.service';
import { CiPolicyService } from './services/permission.service';

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
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authStateService: AuthStateService,
    private readonly authService: CiAuthService,
    private readonly permissionStateService: PermissionStateService,
    private readonly policyService: CiPolicyService // private readonly featureFlagService: FeatureFlagService, // private readonly pageTitleService: PageTitleService
  ) {}

  ngOnInit() {
    // this.questions$ = this.setUpForms();
    this.setupRouteTitleListener();
    this.authService.retrieveTokenOnPageLoad(); // setup authState
    this.authStateService.isAuthorized$.subscribe(() => {
      this.policyService.loadPermissions(); // setup permissionState
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
        next: ([response, returnUrl, ready]) => {
          this.loginResponse = response;
          // if (response.status === ApiResponseStatus.Success && ready) {
          //   this.router.navigate(['/dashboard']);
          // }
          console.log(response);
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
