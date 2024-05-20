import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat',
  standalone: true
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(value: string | Date, dateFormat: string = 'shortDate', timeFormat: string = 'shortTime'): string {
    if (!value) return '';

    const date = new Date(value);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
}
