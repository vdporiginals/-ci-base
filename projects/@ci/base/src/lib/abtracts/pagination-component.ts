import { Directive, EventEmitter, Input, Output } from '@angular/core';
@Directive()
export abstract class PaginationAbtractsComponent {
  @Input() id!: string;
  @Input() maxSize!: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  @Output() pageBoundsCorrection!: EventEmitter<number>;
  @Input() cssClass!: string;
}
