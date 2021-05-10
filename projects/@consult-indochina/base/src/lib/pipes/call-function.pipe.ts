import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'callFunctionPipe',
})
export class CallFunctionPipe implements PipeTransform {
  public transform(
    value: any,
    handler: (value: any) => any,
    context?: any
  ): any {
    if (context) {
      return handler.call(context, value);
    }

    return handler(value);
  }
}

@NgModule({
  declarations: [CallFunctionPipe],
  exports: [CallFunctionPipe],
})
export class CallFunctionPipeModule {}
