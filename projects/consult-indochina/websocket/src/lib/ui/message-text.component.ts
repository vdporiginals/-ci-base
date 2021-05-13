import { CommonModule, DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import {
  OnDestroy,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Component,
  NgModule,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ActionMessage, MessageInterface } from '../config/websocket.interface';
export interface MessageType {
  sendedClass: string;
  receiveClass: string;
}

@Component({
  selector: 'ci-message-text',
  template: `
    <div
      class="ci_message_wrap"
      [class]="
        item.SenderUserProfileId == currentUserId
          ? messageWrapCss.sendedClass
          : messageWrapCss.receiveClass
      "
    >
      <div class="ci_message_box">
        <p [class]="">{{ item.Content }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./message-text.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageTextComponent implements OnDestroy, OnInit {
  @Input()
  index!: number;
  @Input() item!: MessageInterface;
  @Input()
  searchTextString!: string;
  @Input() messageWrapCss!: MessageType;
  @Input() currentUserId: any;
  curUser!: Observable<any>;
  actionEnum = ActionMessage;
  constructor(private datePipe: DatePipe) {}
  ngOnInit() {
  }
  ngOnDestroy() {}
}

@NgModule({
  declarations: [MessageTextComponent],
  imports: [CommonModule],
  exports: [MessageTextComponent],
  providers: [DatePipe],
})
export class CiMessageTextModule {}
