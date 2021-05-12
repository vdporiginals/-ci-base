import { ViewChild, ElementRef, Directive } from '@angular/core';
import { Subject } from 'rxjs';
import jsQR from 'jsqr';

@Directive()
export abstract class BaseQrScannerWebrtc {
  @ViewChild('canvas')
  canvasElement!: ElementRef;
  height = 200;
  width = 200;
  canvas!: {
    beginPath: () => void;
    moveTo: (arg0: any, arg1: any) => void;
    lineTo: (arg0: any, arg1: any) => void;
    lineWidth: number;
    strokeStyle: any;
    stroke: () => void;
    drawImage: (
      arg0: any,
      arg1: number,
      arg2: number,
      arg3: any,
      arg4: any
    ) => void;
    getImageData: (arg0: number, arg1: number, arg2: any, arg3: any) => any;
  };
  video = document.createElement('video');
  private currentCode = new Subject();
  currentCode$ = this.currentCode.asObservable();

  setUpVideo() {
    this.video.width = this.width;
    this.video.height = this.height;
  }

  setUpCanvas() {
    this.canvasElement.nativeElement.width = this.width;
    this.canvasElement.nativeElement.height = this.height;
    this.canvas = this.canvasElement.nativeElement.getContext('2d');
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        this.video.srcObject = stream;

        this.video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
        this.video.play();
        requestAnimationFrame(this.tick.bind(this));
        // this.drawLine({ x: 0, y: 0 }, { x: 40, y: 0 }, '#00A050', 10);
        // this.drawLine({ x: 0, y: 0 }, { x: 0, y: 40 }, '#00A050', 10);

        // this.drawLine(
        //   { x: this.width, y: 0 },
        //   { x: this.width - 40, y: 0 },
        //   '#00A050',
        //   10
        // );
        // this.drawLine(
        //   { x: this.width, y: 0 },
        //   { x: this.width, y: 40 },
        //   '#00A050',
        //   10
        // );

        // this.drawLine(
        //   { x: 0, y: this.height },
        //   { x: 0, y: this.height - 40 },
        //   '#00A050',
        //   10
        // );
        // this.drawLine(
        //   { x: 0, y: this.height },
        //   { x: 40, y: this.height },
        //   '#00A050',
        //   10
        // );

        // this.drawLine(
        //   { x: this.width, y: this.height },
        //   { x: this.width - 40, y: this.height },
        //   '#00A050',
        //   10
        // );
        // this.drawLine(
        //   { x: this.width, y: this.height },
        //   { x: this.width, y: this.height - 40 },
        //   '#00A050',
        //   10
        // );

        // this.drawLine(
        //   { x: this.width / 2, y: this.height / 2 },
        //   { x: this.width / 2 + 20, y: this.height / 2 },
        //   '#00A050',
        //   2
        // );
        // this.drawLine(
        //   { x: this.width / 2, y: this.height / 2 },
        //   { x: this.width / 2, y: this.height / 2 + 20 },
        //   '#00A050',
        //   2
        // );
        // this.drawLine(
        //   { x: this.width / 2, y: this.height / 2 },
        //   { x: this.width / 2 - 20, y: this.height / 2 },
        //   '#00A050',
        //   2
        // );
        // this.drawLine(
        //   { x: this.width / 2, y: this.height / 2 },
        //   { x: this.width / 2, y: this.height / 2 - 20 },
        //   '#00A050',
        //   2
        // );
      });
  }

  destroyScanner() {
    cancelAnimationFrame(this.tick.bind(this) as any);
    this.video.pause();
    this.video.srcObject = null;
    // this.video = null;
  }

  drawLine(
    begin: { x: any; y: any },
    end: { x: any; y: any },
    color: string,
    lineWidth = 4
  ) {
    this.canvas.beginPath();
    this.canvas.moveTo(begin.x, begin.y);
    this.canvas.lineTo(end.x, end.y);
    this.canvas.lineWidth = lineWidth;
    this.canvas.strokeStyle = color;
    this.canvas.stroke();
  }

  tick(): void {
    let data;
    // loadingMessage.innerText = '⌛ Loading video...';
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      // loadingMessage.hidden = true;
      this.canvasElement.nativeElement.hidden = false;
      // outputContainer.hidden = false;

      this.canvasElement.nativeElement.height = this.height;
      this.canvasElement.nativeElement.width = this.width;
      this.canvas.drawImage(
        this.video,
        0,
        0,
        this.canvasElement.nativeElement.width,
        this.canvasElement.nativeElement.height
      );
      const imageData = this.canvas.getImageData(
        0,
        0,
        this.canvasElement.nativeElement.width,
        this.canvasElement.nativeElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        this.drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          '#FF3B58'
        );
        this.drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          '#FF3B58'
        );
        this.drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          '#FF3B58'
        );
        this.drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          '#FF3B58'
        );
        if (code.data) {
          data = code.data;
        }
        // outputMessage.hidden = true;
        // outputData.parentElement.hidden = false;
        // outputData.innerText = code.data;
      } else {
        console.log('nothing');

        // outputMessage.hidden = false;
        // outputData.parentElement.hidden = true;
      }
    }
    if (data) {
      this.currentCode.next(data);
      return cancelAnimationFrame(this.tick.bind(this) as any);
    } else {
      this.currentCode.next();
    }
    requestAnimationFrame(this.tick.bind(this));
  }
}
