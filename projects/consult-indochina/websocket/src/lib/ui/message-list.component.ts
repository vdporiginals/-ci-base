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
import { CiMessageTextModule } from './message-text.component';
@Component({
  selector: 'ci-message-list',
  template: `
    <div
      *ngFor="let item of messageList$; let i = index; trackBy: trackFunc"
      class="ci_mes_list"
    >
      <ng-container
        *ngTemplateOutlet="messageText; context: { item: item }"
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
    `,
  ],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CiMessageListComponent implements OnInit {
  @Input() messageList$!: MessageInterface[];
  @ContentChild('item', { static: false }) messageText!: TemplateRef<any>;

  ngOnInit() {
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
  imports: [CommonModule, CiMessageTextModule],
  exports: [CiMessageListComponent],
})
export class CiMessageListModule {}
