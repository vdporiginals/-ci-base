import { CommonModule } from '@angular/common';
import {
  OnDestroy,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Component,
  NgModule,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MessageInterface } from '../config/websocket.interface';
export interface MessageType {
  sendedClass: string;
  receiveClass: string;
}

@Component({
  selector: 'ci-message-text',
  template: `
    <div class="ci_message_wrap" [class]="messageWrapCss">
      <div class="ci_create_time">{{ item.CreatedOn }}</div>
      <div class="ci_message_box">
        <p>{{ item.Content }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .ci_message_wrap {
        display: block;
        height: auto;
      }
    `,
  ],
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
  curUser!: Observable<any>;

  constructor() {}
  ngOnInit() {}
  ngOnDestroy() {}
}

@NgModule({
  declarations: [MessageTextComponent],
  imports: [CommonModule],
  exports: [MessageTextComponent],
})
export class CiMessageTextModule {}
