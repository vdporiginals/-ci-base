import { Input, ViewChild, ElementRef, Directive } from '@angular/core';
import { PeerService } from '../services/peer.service';
import * as uuid from 'uuid';

@Directive()
export abstract class CiPeerConnector {
  @ViewChild('videoUser') videoUser!: ElementRef;
  @ViewChild('videoPartner') videoPartner!: ElementRef;
  topVideoFrame = 'partner-video';
  myEl!: HTMLMediaElement;
  partnerEl!: HTMLMediaElement;
  isAnswerClick!: boolean;
  partnerPeerId!: string;
  constructor(private peerService: PeerService) {}

  init() {
    const myId = uuid.v4();
    this.myEl = this.videoUser.nativeElement;
    this.partnerEl = this.videoPartner.nativeElement;
    this.peerService.init(myId, this.myEl, this.partnerEl);
  }

  call() {
    this.isAnswerClick = true;
    this.peerService.call(this.partnerPeerId);
    this.swapVideo('my-video');
  }

  swapVideo(topVideo: string) {
    this.topVideoFrame = topVideo;
  }
}
