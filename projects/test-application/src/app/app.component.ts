import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiAuthStateService } from '@consult-indochina/auth';
import {
  CiSocketService,
  BaseConnectorComponent,
} from '@consult-indochina/websocket';
// import { BaseConnectorComponent } from 'dist/consult-indochina/websocket/public-api';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  of,
  Subject,
} from 'rxjs';
import {
  map,
  mergeMap,
  scan,
  shareReplay,
  startWith,
  take,
  tap,
} from 'rxjs/operators';
import { LoginService } from './services/login.service';
// import { LocalStorageService } from '@consult-indochina/auth';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseConnectorComponent implements OnInit {
  title = 'test-application';
  textSearch: FormControl = new FormControl();
  // questions$!: Observable<CiBaseFormsModel<any>[]>;
  user = '';
  password = '';
  loginResponse: any;
  loginForm;
  listHistory: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  his!: Observable<any>;

  deleteSubject = new Subject();
  async getHistory() {
    // if (this.unread) {
    //   this.notiStateService.setMessageCount(
    //     this.notiStateService.messageCount.getValue() - +this.unread
    //   );
    // }
    let receive;
    if (
      JSON.parse(localStorage.getItem('access_token') as any).UserProfileId ==
      '2323'
    ) {
      receive = '2053';
    } else {
      receive = '2323';
    }
    this.messageService.getListMessage(receive).subscribe((res: any) => {
      console.log(res);

      this.listHistory.next(res.body.Payload.reverse());
      // this.loading.closeLoading();
      // console.log(this.listHistory.getValue());
    });
    return true;
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService,
    private ciAuthState: CiAuthStateService,
    socketService: CiSocketService
  ) {
    super(socketService);
    this.loginForm = this.fb.group({
      grant_type: ['password'],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.ciAuthState.set({
      AccessToken: JSON.parse(localStorage.getItem('access_token') as any)
        .access_token,
    });
  }
  currentUserId = 1;
  // constructor(
  //   private messageService: MessageService,
  //   // private http: HttpClient,
  //   private readonly route: ActivatedRoute // private readonly router: Router, // private ciAccountService: CiAccountService, // private readonly ciAuthStateService: CiAuthStateService, // private readonly authService: CiAuthService, // private readonly secs: CiSecurityService, // private readonly permissionStateService: PermissionStateService // private readonly policyService: CiPolicyService // private readonly featureFlagService: FeatureFlagService, // private readonly pageTitleService: PageTitleService
  // ) {}

  ngOnInit() {
    // this.getHistory();
    this.connectSocket$().subscribe((res) => {
      console.log(res);
    });
    let receive: string;
    if (
      JSON.parse(localStorage.getItem('access_token') as any).UserProfileId ==
      '2323'
    ) {
      receive = '2053';
    } else {
      receive = '2323';
    }
    // this.deleteSubject.asObservable().pipe(
    //   mergeMap((d1) =>
    //     this.messageService.getListMessage(receive).pipe(
    //       map((res: any) => {
    //         console.log(res);
    //         return of(res.body.Payload.reverse());
    //       })
    //     )
    //   )
    // );
    this.his = merge(
      this.messageService.getListMessage(receive).pipe(
        map((res: any) => {
          console.log(res);

          return res.body.Payload.reverse();
        })
      ),
      this.deleteSubject
    ).pipe(
      scan((products: any[], product: any) => {
        return this.delRandomScan(products, product);
      }),
      shareReplay(1)
    );

    // this.his = combineLatest([, this.deleteSubject]).pipe(
    //   tap(([items, deleteItem]) => {
    //     console.log();

    //     if (deleteItem && deleteItem.op === 'deleteItem') {
    //       let index = items.findIndex(
    //         (item: any) => item.MessageId === deleteItem.id
    //       );
    //       if (index >= 0) {
    //         items.splice(index, 1);
    //       }
    //       return items;
    //     } else {
    //       return items.concat(deleteItem);
    //     }
    //   })
    // );
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
    // this.secs.resendConfirmCode('abc').subscribe((res) => {
    //   console.log(res);
    // });
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
    // this.ciAuthStateService.currentUser$.subscribe((res) => {
    //   console.log(res);
    // });
    // this.authService.retrieveTokenOnPageLoad(); // setup authState
    // this.ciAuthStateService.isAuthorized$.subscribe(() => {
    //   // this.policyService.loadPermissions(); // setup permissionState
    //   // this.featureFlagService.loadFeatures();
    // });
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

  delRandom(products?: any): any {
    this.deleteSubject.next({ op: 'delete', id: products.MessageId });
  }

  delRandomScan(products: any[], product: any): any {
    console.log(products.filter((p) => p.MessageId !== product.id));

    // if (product.status === StatusCode.Added) {
    //   // Return a new array from the array of products + new product
    //   return [...products, { ...product, status: StatusCode.Unchanged }];
    // }
    if (product.op === 'delete') {
      // Filter out the deleted product
      return products.filter((p) => p.MessageId !== product.id);
    } else {
      return products;
    }
    // if (product.status === StatusCode.Updated) {
    //   // Return a new array with the updated product replaced
    //   return products.map((p) =>
    //     p.id === product.id ? { ...product, status: StatusCode.Unchanged } : p
    //   );
    // }
  }
  login() {
    console.log(this.user);
    // this.authService
    //   .login({
    //     Username: this.user,
    //     Password: this.password,
    //   })
    //   .pipe(
    //     withLatestFrom(
    //       this.route.queryParams.pipe(pluck('returnUrl'), take(1))
    //       // this.permissionStateService.permissionReady$
    //     ),
    //     finalize(() => {
    //       this.user = '';
    //       this.password = '';
    //     })
    //   )
    //   .subscribe({
    //     next: (res) => {
    //       this.loginResponse = res;
    //       // if (res.status === ApiResponseStatus.Success && ready) {
    //       //   this.router.navigate(['/dashboard']);
    //       // }
    //       console.log(res);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
  }
  login2() {
    this.loginService.login(this.loginForm.value).subscribe(
      (res) => {
        // this.storage.userToken.next(res);
        // this.noti.showSuccess("Đăng nhập thành công!");JSON.parse(
        localStorage.setItem('access_token', JSON.stringify(res));
        // this.loading.closeLoading();
        this.router.navigate(['']);
      },
      (err) => {
        // this.loading.closeLoading();
        // this.noti.showError(`Đăng nhập thất bại! ${err.message}`);
      }
    );
  }
  searchItemsClient(ev: any) {
    console.log(ev);
  }
}
