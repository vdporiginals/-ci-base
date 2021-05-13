import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageInterface } from '../../config/websocket.interface';
import { CiMessageListModule } from '../message-list.component';
import { CiMessageTextModule } from '../message-text.component';

@Component({
  selector: 'ci-fb-chat-design',
  templateUrl: './fb-chat-design.component.html',
  styleUrls: ['./fb-chat-design.component.scss']
})
export class FbChatDesignComponent implements OnInit {
  @Input() currentUserId!: number;
  @Input() his!: Observable<MessageInterface[]>;
  @Output() callback = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }

}
@NgModule({
  declarations: [FbChatDesignComponent],
  imports: [CommonModule, CiMessageListModule, CiMessageTextModule],
  exports: [FbChatDesignComponent],
})
export class FbChatDesignModule {}
