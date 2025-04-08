import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTruncate',
  standalone: true,
  pure: true,
})
export class CustomTruncatePipe implements PipeTransform {
  transform(text: string): string {
    return text.length > 20 ? text.slice(0, 20) + '...' : text;
  }
}
