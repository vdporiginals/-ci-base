import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CiMessageTextModule } from './message-text.component';
@Component({
  selector: 'ci-message-list',
  template: `
    <div
      *ngFor="
        let item of messageList$ | async;
        let i = index;
        trackBy: trackFunc
      "
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
export class MessageListComponent {
  @Input() messageList$!: Observable<any[]>;
  @ContentChild('item', { static: false }) messageText!: TemplateRef<any>;

  trackFunc(index: number, item: any) {
    return item;
  }
}

@NgModule({
  declarations: [MessageListComponent],
  imports: [CommonModule, CiMessageTextModule],
  exports: [MessageListComponent],
})
export class CiMessageListComponent {}
