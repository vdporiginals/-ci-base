import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageInterface } from '../config/websocket.interface';

@Directive()
export abstract class BaseChatComponent {
  @Input() currentUserId!: number;
  @Input() his!: Observable<MessageInterface[]>;
  @Output() chatButtonEvent = new EventEmitter();
}
