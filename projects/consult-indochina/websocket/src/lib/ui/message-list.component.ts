import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  NgModule,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MessageInterface } from '../config/websocket.interface';
import { CheckDatePipe, CheckDatePipeModule } from '../utils/check-date.pipe';
import { CiMessageTextModule } from './message-text.component';
@Component({
  selector: 'ci-message-list',
  template: `
    <div
      *ngFor="let item of messageList$; let i = index; trackBy: trackFunc"
      class="ci_mes_list"
    > 
    <div *ngIf="item | checkDatePipe: messageList$[i - 1]" class="ci-chat_styte_date">
      <span>{{item.CreatedOn | date: 'dd-MM-YYYY'}}</span>
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
      }
      .ci-chat_styte_date{
        
      }
      .ci-chat_styte_date::after{
        content: '';
        width: 100%;
        height: 1px;
        background: black;
      }
    `,
  ],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CiMessageListComponent implements OnInit {
  @Input() messageList$!: MessageInterface[];
  @ContentChild('item', { static: false }) messageText!: TemplateRef<any>;

  ngOnInit() {
    console.log(this.messageList$);
    // if (this.messageList$) {
    //   this.messageList$.subscribe((res) => {
    //     console.log(res);
    //   });
    // }
  }
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
