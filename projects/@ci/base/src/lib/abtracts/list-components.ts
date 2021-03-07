import { Directive, Injectable, Input } from '@angular/core';

@Directive()
export abstract class ListComponent<T> {
  @Input() items: T[] | undefined;
}
