import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MessageInterface } from '../config/websocket.interface';

@Directive()
export abstract class BaseChatComponent {
  @Input() currentUserId!: number;
  @Input() his!: Observable<MessageInterface[]>;
  @Output() chatButtonEvent = new EventEmitter();

  @ViewChild('listMessageParent', { read: ViewContainerRef })
  listMessageParent: any;
  @ViewChild('ionContent') messageContainer: any;

  public mutationObserver: MutationObserver = new MutationObserver(
    (res: any) => {
      this.scrollToBottom();
    }
  );
  /**
   * @function call scroll to bottom in ngAfterviewInit or ionViewDidInit
   *
   */
  triggerScrollToBottom() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
    if (this.messageContainer) {
      this.mutationObserver.observe(this.listMessageParent.nativeElement, {
        childList: true,
      });
    } else {
      this.mutationObserver.observe(this.messageContainer.el, {
        childList: true,
      });
    }
  }

  /**
   * @function scroll to bottom function
   *
   */
  scrollToBottom() {
    if (this.messageContainer) {
      return this.messageContainer.scrollToBottom(300);
    }

    return this.listMessageParent.nativeElement.scroll({
      top: this.listMessageParent.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }
}
