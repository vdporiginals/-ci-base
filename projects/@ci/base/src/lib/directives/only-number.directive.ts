import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]',
})
export class OnlyNumberDirective {
  regexStr = '^[0-9]*$';
  constructor() {}

  @Input() OnlyNumber!: boolean | string;

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const e = event as KeyboardEvent;

    if (this.OnlyNumber) {
      if (
        [
          'Delete',
          'Backspace',
          'Tab',
          'Control',
          'Shift',
          ' ',
          'ArrowRight',
          'ArrowDown',
          'ArrowLeft',
          'ArrowUp',
        ].indexOf(e.key) !== -1 ||
        // Allow: Ctrl+A
        ((e.key === 'A' || e.key === 'a') && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        ((e.key === 'C' || e.key === 'c') && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        ((e.key === 'V' || e.key === 'v') && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        ((e.key === 'X' || e.key === 'x') && e.ctrlKey === true)
        // Allow: home, end, left, right
        // (e.key >= 35 && e.key <= 39)
      ) {
        // let it happen, don't do anything
        return;
      }
      const ch = e.key;
      const regEx = new RegExp(this.regexStr);
      if (regEx.test(ch)) {
        return;
      } else {
        e.preventDefault();
      }
    }
  }
}
