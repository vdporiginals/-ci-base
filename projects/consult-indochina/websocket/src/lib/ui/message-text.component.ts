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
export interface MessageType {
  sendedClass: string;
  receiveClass: string;
}

@Component({
  selector: 'ci-message-text',
  template: `
    <div class="ci_message_wrap" [class]="messageWrapCss">
      <div class="ci_create_time">{{ item.createdAt }}</div>
      <div class="ci_message_box">
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

@NgModule({
  declarations: [MessageTextComponent],
  imports: [CommonModule],
  exports: [MessageTextComponent],
})
export class CiMessageTextModule {}
