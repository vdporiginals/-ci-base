/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Inject, Injectable } from '@angular/core';
import Peer from 'peerjs';
import { WEBRTC_CONFIG } from '../config/webrtc.config';
import { WebRTCConfig } from '../config/webrtc.interface';
import { CiWebrtcModule } from '../webrtc.module';
// create a WS instance, listening on port 1234 on localhost

@Injectable({
  providedIn: CiWebrtcModule,
})
export class PeerService {
  peer!: Peer;
  myStream!: MediaStream;
  myEl!: HTMLMediaElement;
  partnerEl!: HTMLMediaElement;

  //   stun = 'stun.l.google.com:19302';
  mediaConnection!: Peer.MediaConnection;
  options: Peer.PeerJSOption;
  //   stunServer: RTCIceServer = {
  //     urls: 'stun:' + this.stun,
  //   };

  constructor(@Inject(WEBRTC_CONFIG) private webrtcConfig: WebRTCConfig) {
    this.options = this.webrtcConfig.PEER_OPTIONS || {};
  }

  getMedia() {
    navigator.getUserMedia(
      { audio: true, video: true },
      (stream) => {
        this.handleSuccess(stream);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  async init(
    peerId: string,
    myEl: HTMLMediaElement,
    partnerEl: HTMLMediaElement
  ) {
    this.myEl = myEl;
    this.partnerEl = partnerEl;
    try {
      this.getMedia();
    } catch (e) {
      this.handleError(e);
    }
    await this.createPeer(peerId);
  }

  async createPeer(peerId: string) {
    this.peer = new Peer(peerId, this.options);
    this.peer.on('open', () => {
      this.wait();
    });
  }

  call(partnerId: string) {
    const call = this.peer.call(partnerId, this.myStream);
    call.on('stream', (stream: MediaProvider | null) => {
      this.partnerEl.srcObject = stream;
    });
  }

  wait() {
    this.peer.on('call', (call: any) => {
      call.on('close', function () {
        alert('The videocall has finished');
      });
      call.answer(this.myStream);
      call.on('stream', (stream: MediaProvider | null) => {
        this.partnerEl.srcObject = stream;
      });
    });
  }

  handleSuccess(stream: MediaStream) {
    this.myStream = stream;
    this.myEl.srcObject = stream;
  }

  handleError(error: any) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      //   const v = constraints.video;
      // this.errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
      this.errorMsg(`The resolution px is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError') {
      this.errorMsg(
        'Permissions have not been granted to use your camera and ' +
          'microphone, you need to allow the page access to your devices in ' +
          'order for the demo to work.'
      );
    }
    this.errorMsg(`getUserMedia error: ${error.name}`, error);
  }

  errorMsg(msg: string, error?: any) {
    console.log(msg, error);
    // const errorElement = document.querySelector('#errorMsg');
    // errorElement.innerHTML += `<p>${msg}</p>`;
    // if (typeof error !== 'undefined') {
    //   console.error(error);
    // }
  }

  disconnect() {
    // this.dataConnection.close();
    this.peer.destroy();
    this.peer.disconnect();
    this.myStream.getVideoTracks()[0].stop();
    // this.
  }
}
