import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[mcAmountMask]'
})
export class AmountMaskDirective {
  static readonly NUMBER_REGEXP = /^(0|([1-9]{1}\d*))(\.\d{0,2})?$/;

  constructor(private hostElement: ElementRef) { }

  @HostListener('keypress', ['$event']) onKeypress(event: KeyboardEvent) {
    const value = this.hostElement.nativeElement.value;
    const selectionStart = this.hostElement.nativeElement.selectionStart;
    const selectionEnd = this.hostElement.nativeElement.selectionEnd;
    const leftPart = value.slice(0, selectionStart);
    const rightPart = value.slice(selectionEnd);

    const featureValue = `${leftPart}${event.key}${rightPart}`;

    if (!AmountMaskDirective.NUMBER_REGEXP.test(featureValue)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
     event.preventDefault();
  }
}

