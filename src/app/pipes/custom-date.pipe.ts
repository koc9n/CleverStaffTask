import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-timezone';

@Pipe({
  name: 'customDatePipe'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: moment.Moment, format: string, timezone: string): string {
    return value.tz(timezone).format(format);
  }
}
