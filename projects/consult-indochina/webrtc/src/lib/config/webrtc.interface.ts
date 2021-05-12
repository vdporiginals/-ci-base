import * as Peer from 'peerjs';

export interface WebRTCConfig {
  PEER_OPTIONS?: PeerJSOptions;
}

export interface PeerJSOptions extends Peer.PeerJSOption {}
