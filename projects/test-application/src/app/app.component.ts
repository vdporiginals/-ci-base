import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiAuthStateService } from '@consult-indochina/auth';
import {
  BaseConnectorComponent,
  CiSocketService,
} from '@consult-indochina/websocket';
import {
  ActionTableEnum,
  DataTable,
  ListLabel,
} from 'projects/consult-indochina/common/src/lib/ui/ci-table/ci-table.model';
// import { BaseConnectorComponent } from 'dist/consult-indochina/websocket/public-api';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, scan, shareReplay } from 'rxjs/operators';
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
    // let receive;
    // if (
    //   JSON.parse(localStorage.getItem('access_token') as any).UserProfileId ==
    //   '2323'
    // ) {
    //   receive = '2053';
    // } else {
    //   receive = '2323';
    // }
    // this.messageService.getListMessage(receive).subscribe((res: any) => {
    //   console.log(res);

    //   this.listHistory.next(res.body.Payload.reverse());
    //   // this.loading.closeLoading();
    //   // console.log(this.listHistory.getValue());
    // });
    return true;
  }

  listLable: ListLabel[] = [
    {
      id: '',
      label: 'Stt',
      type: ActionTableEnum.index,
    },
    {
      id: 'fname',
      label: 'Họ',
      type: ActionTableEnum.text,
    },
    {
      id: 'lname',
      label: 'Tên',
      type: ActionTableEnum.text,
    },
    {
      id: 'phone',
      label: 'Số điện thoại',
      type: ActionTableEnum.number,
    },
    {
      id: 'email',
      label: 'Email',
      type: ActionTableEnum.text,
    },
    {
      id: 'address',
      label: 'Địa chỉ',
      type: ActionTableEnum.text,
    },
    {
      id: '',
      label: '',
      type: ActionTableEnum.icon,
      image: {
        edit: '../assets/svg/icon-edit.svg',
        delete: '../assets/svg/icon-delete.svg',
      },
    },
    // , {
    //   id: "",
    //   label: "",
    //   type: "action-button",
    //   text: [
    //     {
    //       edit: "Sửa"
    //     },
    //     {
    //       delete: "Xoá"
    //     }
    //   ]
    // }
  ];
  dataTable: DataTable[] = [
    {
      fname: 'fname',
      lname: 'Hari',
      phone: '0968744932',
      email: 'nambui377@gmail.com',
      address: 'phú diễn',
    },
    {
      fname: ' Bùi',
      lname: 'Nam',
      phone: '0968744932',
      email: 'nambui377@gmail.com',
      address: 'phú diễn',
    },
    {
      fname: ' Bùi',
      lname: 'Nam',
      phone: '0968744932',
      email: 'nambui377@gmail.com',
      address: 'phú diễn',
    },
  ];

  constructor(
    private fb: FormBuilder,
    socketService: CiSocketService,
    // private loginService: LoginService,
    private router: Router,
    private messageService: MessageService,
    private ciAuthStateService: CiAuthStateService // socketService: CiSocketService
  ) {
    super(socketService);
    this.loginForm = this.fb.group({
      grant_type: ['password'],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // this.ciAuthState.set({
    //   AccessToken: JSON.parse(localStorage.getItem('access_token') as any)
    //     .access_token,
    // });
  }
  currentUserId = 2053;
  // constructor(
  //   private messageService: MessageService,
  //   // private http: HttpClient,
  //   private readonly route: ActivatedRoute // private readonly router: Router, // private ciAccountService: CiAccountService, // private readonly ciAuthStateService: CiAuthStateService, // private readonly authService: CiAuthService, // private readonly secs: CiSecurityService, // private readonly permissionStateService: PermissionStateService // private readonly policyService: CiPolicyService // private readonly featureFlagService: FeatureFlagService, // private readonly pageTitleService: PageTitleService
  // ) {}

  ngOnInit() {
    this.connectSocket$().subscribe((res) => {
      console.log(res);
    });
    // this.getHistory();
    // this.connectSocket$().subscribe((res) => {
    //   console.log(res);
    // });
    let receive: string;
    // if (
    //   JSON.parse(localStorage.getItem('access_token') as any).UserProfileId ==
    //   '2323'
    // ) {
    //   receive = '2053';
    // } else {
    //   receive = '2323';
    // }

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
    // this.his = merge(
    //   this.messageService.getListMessage(receive).pipe(
    //     map((res: any) => {
    //       console.log(res);

    //       return res.body.Payload.reverse();
    //     })
    //   ),
    //   this.deleteSubject
    // ).pipe(
    //   scan((products: any[], product: any) => {
    //     return this.delRandomScan(products, product);
    //   }),
    //   shareReplay(1)
    // );

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
    this.ciAuthStateService.currentUser$.subscribe((res) => {
      console.log(res);
    });
    this.ciAuthStateService.set({ AccessToken: 'asdasd', ExpireDate: 'asf' });
    this.ciAuthStateService.select('AccessToken').subscribe((res) => {
      console.log(res);
    });
    // this.authService.retrieveTokenOnPageLoad(); // setup authState
    this.ciAuthStateService.isAuthorized$.subscribe(() => {
      // this.policyService.loadPermissions(); // setup permissionState
      // this.featureFlagService.loadFeatures();
    });
  }
  handleCallbackEventEdit = (ev: any) => {
    console.log(ev);
  };
  handleCallbackEventDelete = (ev: any) => {
    console.log(ev);
  };
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
    // this.loginService.login(this.loginForm.value).subscribe(
    //   (res) => {
    //     // this.storage.userToken.next(res);
    //     // this.noti.showSuccess("Đăng nhập thành công!");JSON.parse(
    //     localStorage.setItem('access_token', JSON.stringify(res));
    //     // this.loading.closeLoading();
    //     this.router.navigate(['']);
    //   },
    //   (err) => {
    //     // this.loading.closeLoading();
    //     // this.noti.showError(`Đăng nhập thất bại! ${err.message}`);
    //   }
    // );
  }
  searchItemsClient(ev: any) {
    console.log(ev);
  }
}
