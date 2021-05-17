# Websocket

### Usage

**_ HTML _**

- his: Observable lấy về history của tin nhắn
- currentUserId: User id đang đăng nhập

```
 <ci-fb-chat-design
    [his]="his"
    [currentUserId]="currentUserId"
    (chatButtonEvent)="delRandom($event.item)"
  >
  </ci-fb-chat-design>
```

- Demo his observable:

```
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
```

- App module import:

```
CiWebsocketModule.forRoot(
      {
          ACCESS_TOKEN:JSON.parse(localStorage.getItem('access_token') as any).access_token, // Access token localstorage (nếu dùng state token thì bỏ qua ko truyền)
        RECONNECT_INTERVAL: 5000,  // THời gian reconnect khi disconnect socket
        WS_ENDPOINT:
          'wss://7o5p7mfv40.execute-api.ap-southeast-1.amazonaws.com/production', // websocket link
      },
      {
        provide: ACCESS_TOKEN_PROVIDER,
        deps: [CiAuthStateService], // provide service chứa state access token observable
        useFactory: accessTokenFactory, // hàm factory return về access token observable
      } // Provider accesstoken qua auth state (thêm từ import { accessTokenFactory, CiAuthModule, CiAuthStateService } from '@consult-indochina/auth';)
    ),
```

### Customize

- Có thể tạo component dưới dạng như sau để customize:

1.  HTML:

```
<ng-container *ngIf="his">
  <ci-message-list [messageList$]="his | async">
    <ng-template #item let-item="item" let-checked="checked">
      <ci-message-text
        [item]="item"
        [currentUserId]="currentUserId"
        [messageWrapCss]="{
          sendedClass: 'test_sended-fb',
          receiveClass: 'test_receive-fb'
        }"
        (messageTextButton)="chatButtonEvent.emit($event)"
      ></ci-message-text>
      <!-- {{ checked }} -->
      <!-- <button
        (click)="callback.emit(item)"
        *ngIf="item.SenderUserProfileId == currentUserId"
        class="chat-fb-button"
      ></button> -->
    </ng-template>
  </ci-message-list>
</ng-container>

```

2: TS

```
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseChatComponent } from '@consult-indochina/websocket';
import { MessageInterface } from '@consult-indochina/websocket';
import { CiMessageListModule } from '@consult-indochina/websocket';
import { CiMessageTextModule } from '@consult-indochina/websocket';

@Component({
 selector: 'ci-custom-design',
 templateUrl: './ci-custom-design.component.html',
 styleUrls: ['./ci-custom-design.component.scss']
})
export class CustomeDesignComponent extends BaseChatComponent {

}
@NgModule({
 declarations: [CustomeDesignComponent],
 imports: [CommonModule, CiMessageListModule, CiMessageTextModule],
 exports: [CustomeDesignComponent],
})
export class CustomeDesignModule {}
```
