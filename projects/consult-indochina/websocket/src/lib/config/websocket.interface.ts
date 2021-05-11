import { Observable } from 'rxjs';

export interface WebSocketConfig {
  // API_URL: string;
  WS_ENDPOINT: string;
  RECONNECT_INTERVAL: number;
  ACCESS_TOKEN: string;
  ACCESS_TOKEN$?: Observable<string>;
}

export interface MessageInterface {
  Action: ActionMessage;
  Content: string;
  SenderUserProfileId: number | string;
  MessageId: number | string;
  RecipientUserProfileId: number | string;
  CreatedOn: string;
  Type: TypeMessageEnum;
}

export enum ActionMessage {
  receive = 'receiveMessage',
  sended = 'sendMessage',
  sendedGroup = 'sendGroupMessage',
  callRequest = 'callRequest',
  callResponse = 'callResponse',
  videoCallDisconnect = 'videoCallDisconnect',
}

export enum TypeMessageEnum {
  normalMessage = 1,
  imageMessage = 2,
  videoMessage = 3,
  videoCallMessage = 4,
}
