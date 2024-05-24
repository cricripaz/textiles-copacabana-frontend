import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTimeFormat',
  standalone: true
})
export class DateTimeFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}


  transform(value: string | Date, dateFormat: string = 'shortDate', timeFormat: string = 'shortTime'): string {
    if (!value) return '';

    const date = new Date(value);

    const formattedDate = this.datePipe.transform(date, dateFormat, 'UTC');
    const formattedTime = this.datePipe.transform(date, timeFormat, 'UTC');
    return `${formattedDate} ${formattedTime}`;
  }



}
