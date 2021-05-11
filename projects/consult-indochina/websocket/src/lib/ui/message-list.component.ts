import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    NgModule
} from '@angular/core';
import { CiMessageTextModule } from './message-text.component';
@Component({
  selector: 'ci-message-list',
  template: ``,
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent {}

@NgModule({
  declarations: [MessageListComponent],
  imports: [CommonModule, CiMessageTextModule],
  exports: [MessageListComponent],
})
export class CiMessageListComponent {}
