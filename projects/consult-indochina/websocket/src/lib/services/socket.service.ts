/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, delay, retryWhen, switchAll, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {
  ACCESS_TOKEN_PROVIDER,
  WEBSOCKET_CONFIG,
} from '../config/websocket.config';
import { WebSocketConfig } from '../config/websocket.interface';
import { CiWebsocketModule } from '../websocket.module';

// create a WS instance, listening on port 1234 on localhost

@Injectable({
  providedIn: CiWebsocketModule,
})
export class CiSocketService {
  private RECONNECT_INTERVAL: number = 15000;
  private WS_ENDPOINT: string;
  private socket$!: WebSocketSubject<any>;
  private accessToken: string = '';
  private messagesSubject$: Subject<any> = new Subject();
  public messages$ = this.messagesSubject$.pipe(
    // switchMap((data: any) => from(data)),
    switchAll(),
    catchError((e) => {
      throw e;
    })
  );
  private closeByDestroy = false;
  constructor(
    @Inject(WEBSOCKET_CONFIG) private wsConfig: WebSocketConfig,
    @Inject(ACCESS_TOKEN_PROVIDER)
    private accessTokenProvider: Observable<string>
  ) {
    if (this.wsConfig.RECONNECT_INTERVAL)
      this.RECONNECT_INTERVAL = this.wsConfig.RECONNECT_INTERVAL;

    if (this.accessTokenProvider) {
      this.accessTokenProvider.subscribe((res) => {
        this.accessToken = res;
      });
    } else {
      this.accessToken =
        JSON.parse(localStorage.getItem('access_token') || '').access_token ||
        '';
    }

    this.WS_ENDPOINT = this.wsConfig.WS_ENDPOINT;
  }
  /**
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
   */
  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {
    if (this.socket$) {
      this.socket$.complete();
    }

    this.socket$ = new WebSocketSubject(
      this.getNewWebSocket().pipe(
        cfg.reconnect ? this.reconnect.bind(this) : (o) => o,
        tap((message) => this.messagesSubject$.next(message))
      )
    );
  }

  /**
   * Retry a given observable by a time span
   * @param observable the observable to be retried
   */
  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      retryWhen((errors) =>
        errors.pipe(
          tap((val) => console.log('[Socket Service] Try to reconnect', val)),
          delay(this.RECONNECT_INTERVAL || 5000)
        )
      )
    );
  }

  close() {
    this.closeByDestroy = true;
    if (this.socket$) {
      this.socket$.complete();
    }
    this.messagesSubject$.next([]);
  }

  sendMessage(msg: any) {
    if (this.socket$) {
      this.socket$.next(msg);
    } else {
      return console.log('Socket ch??a ???????c kh???i t???o');
    }
  }

  /**
   * Return a custom WebSocket subject which reconnects after failure
   */
  private getNewWebSocket() {
    if (!this.accessToken) {
      this.accessToken =
        JSON.parse(localStorage.getItem('access_token') || '').access_token ||
        null;
      if (!this.accessToken || this.accessToken == '') {
        console.log('none token provided');
      }
    }

    return webSocket({
      url: `${this.WS_ENDPOINT}?Authorization=${this.accessToken}`,
      deserializer: (msg) => {
        try {
          let dat = JSON.parse(msg.data);
          return dat;
        } catch (e) {
          return msg.data;
        } finally {
          return msg.data;
        }
      },
      // url: `wss://hbd51up8a8.execute-api.us-east-2.amazonaws.com/production?Authorization=5uJXjVH3BrOMxZGp_F4XrUj3Xg-8xhkYA8JA95HrdAO3Miy15IrWvFBA2Ui9x5HR2GuimTF4JuOE3-Lt93VqSdVgMog-hMBX9-PjD3vjg8oS7eTj10eEXY36lTX6dZkEAUUivyvfjxuydXIcRCuOaSqvQTZprrussdHkIVLnMQCnOZ5o5PkvmwOCT4GL6oXZF4mgIZNoV3XQxhHz4KfROOuSJmVSz9CXMlYnNoDSZFOvrRO1VwapSndAMSwD1l2bUB0pk3EpNLTCU380xdHmpUrf3nHvTYlVYdZbyAtNPEtknNWSkkXkL36HJ0P9pjLs77GXUGOpenhNSgAGpWU3HRGfOS7oIqzgBVvDc98T-dm_P7TeIzkxiPQd3i8btaFxXa3rXXaKikPo8Wuin9usi28qFl2EEe6fNNzA1qDEBFgd3f-Us32qJw59lqQRrTfSkT6QskNBDdzzUIUBaJGgP2dEIlXxvCKIu00rsNKDEdeAn0ZiWPTRFBzm-8zIC8AsFIrFmvBB8b5VHBU9ya1RpQrZCTc6jMfVHfqY6KVVoHjVeUF4GcxZF1cS6R_tiyK0FwBUS8jPPFPE4xmwyKyvvjCtpdO6QT-DLPDwSmAQPKEjBViDQVy-Dmz-fuwnuLHT`,
      openObserver: {
        next: () => {
          console.log('[SocketService]: connection ok');
        },
      },
      closeObserver: {
        next: () => {
          console.log('[SocketService]: connection closed');

          if (this.socket$) {
            this.socket$?.unsubscribe();
          }

          // this.socket$ = undefined;
          if (this.closeByDestroy !== true) {
            this.connect({ reconnect: true });
          } else {
            this.connect({ reconnect: false });
          }
        },
      },
    });
  }
}
