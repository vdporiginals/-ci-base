import {
  OnDestroy,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Observable } from 'rxjs';
export interface MessageType {
  sendedClass: string;
  receiveClass: string;
}

@Component({
  selector: 'ci-message-text',
  template: `
    <div class="message_wrap" [class]="messageWrapCss">
      <div class="create_time">{{ item.createdAt }}</div>
      <div class="message_box">
        <p>{{ item.content }}</p>
      </div>
    </div>
  `,
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageTextComponent implements OnDestroy, OnInit {
  @Input()
  index!: number;
  @Input() item: any;
  @Input()
  searchTextString!: string;
  @Input() messageWrapCss!: MessageType;
  curUser!: Observable<any>;

  constructor() {}
  ngOnInit() {}
  ngOnDestroy() {}
}
