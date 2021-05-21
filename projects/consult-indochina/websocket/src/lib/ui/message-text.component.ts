import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
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
        <p *ngIf="!item.Type || item.Type == 1">{{ item.Content }}</p>
        <img [src]="item.Content" alt="" *ngIf="item.Type == 2" />
        <video [src]="item.Content" *ngIf="item.Type == 3"></video>
        <div class="show-more">
          <div class="popover" *ngIf="checkShowMore">
            <button
              (click)="messageTextButton.emit({ item: item, type: 'delete' })"
            >
              Delete
            </button>
            <button>Copy</button>
          </div>
          <img
            src="assets/show-more.svg"
            alt=""
            class="show-more-btn"
            *ngIf="item.SenderUserProfileId == currentUserId"
            [style.display]="checkShowMore ? 'block' : ''"
            (click)="checkShowMore = !checkShowMore"
          />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./message-text.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageTextComponent {
  @Input()
  index!: number;
  @Input() item!: MessageInterface;
  @Input()
  searchTextString!: string;
  @Input() messageWrapCss!: MessageType;
  @Input() currentUserId: any;
  @Output() messageTextButton = new EventEmitter();
  curUser!: Observable<any>;
  actionEnum = ActionMessage;
  checkShowMore: boolean = false;
}

@NgModule({
  declarations: [MessageTextComponent],
  imports: [CommonModule],
  exports: [MessageTextComponent],
  providers: [DatePipe],
})
export class CiMessageTextModule {}
