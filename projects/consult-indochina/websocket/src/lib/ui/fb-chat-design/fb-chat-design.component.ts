import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { BaseChatComponent } from '../../base/base-chat-components';
import { CiMessageListModule } from '../message-list.component';
import { CiMessageTextModule } from '../message-text.component';

@Component({
  selector: 'ci-fb-chat-design',
  templateUrl: './fb-chat-design.component.html',
  styleUrls: ['./fb-chat-design.component.scss'],
})
export class FbChatDesignComponent extends BaseChatComponent {}
@NgModule({
  declarations: [FbChatDesignComponent],
  imports: [CommonModule, CiMessageListModule, CiMessageTextModule],
  exports: [FbChatDesignComponent],
})
export class FbChatDesignModule {}
