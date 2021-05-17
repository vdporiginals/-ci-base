import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from '@angular/core';
import { MessageInterface } from '../config/websocket.interface';
import { CheckDatePipeModule } from '../utils/check-date.pipe';
import { CiMessageTextModule } from './message-text.component';
@Component({
  selector: 'ci-message-list',
  template: `
    <div
      *ngFor="let item of messageList$; let i = index; trackBy: trackFunc"
      class="ci_mes_list"
    >
      <div
        *ngIf="item | checkDatePipe: messageList$[i - 1]"
        class="ci-fb-chat-date"
      >
        <span>{{ item.CreatedOn | date: 'dd-MM-YYYY' }}</span>
      </div>
      <ng-container
        *ngTemplateOutlet="messageText; context: { item: item, checked: i }"
      ></ng-container>
    </div>
  `,
  styles: [
    `
      .ci_mes_list {
        display: grid;
        grid-template-column: auto;
        height: 100%;
        position: relative;
      }
      .ci-fb-chat-date {
        position: relative;
        background-color: rgba(0, 0, 0, 0.2);
        height: 1px;
        width: 100%;
        margin: 10px 0;
      }
      .ci-fb-chat-date span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        background: #ffffff;
        padding: 7px 15px;
        font-weight: 600;
        border-radius: 15px;
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
    `,
  ],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CiMessageListComponent {
  @Input() messageList$!: MessageInterface[];
  @ContentChild('item', { static: false }) messageText!: TemplateRef<any>;

  trackFunc(index: number, item: any) {
    return item;
  }
}

@NgModule({
  declarations: [CiMessageListComponent],
  imports: [CommonModule, CiMessageTextModule, CheckDatePipeModule],
  exports: [CiMessageListComponent],
})
export class CiMessageListModule {}
