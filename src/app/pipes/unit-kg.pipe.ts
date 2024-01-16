import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitKg'
})
export class UnitKgPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
