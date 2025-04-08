import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true,
  pure: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(date: Date): string {
    return date.toLocaleString();
  }
}
