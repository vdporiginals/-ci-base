import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseChatComponent } from '../../base/base-chat-components';
import { MessageInterface } from '../../config/websocket.interface';
import { CiMessageListModule } from '../message-list.component';
import { CiMessageTextModule } from '../message-text.component';

@Component({
  selector: 'ci-fb-chat-design',
  templateUrl: './fb-chat-design.component.html',
  styleUrls: ['./fb-chat-design.component.scss']
})
export class FbChatDesignComponent extends BaseChatComponent {
  @Input() currentUserId!: number;
  @Input() his!: Observable<MessageInterface[]>;


}
@NgModule({
  declarations: [FbChatDesignComponent],
  imports: [CommonModule, CiMessageListModule, CiMessageTextModule],
  exports: [FbChatDesignComponent],
})
export class FbChatDesignModule {}
