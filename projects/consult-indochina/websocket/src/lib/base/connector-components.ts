import { Directive, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CiSocketService } from '../services/socket.service';

@Directive()
export abstract class BaseConnectorComponent {
  @Output() public messageReceive: Observable<any> = this.connectSocket$();

  constructor(private socketService: CiSocketService) {}

  connectSocket$(): Observable<any> {
    this.socketService.connect();
    return this.socketService.messages$;
  }
}
