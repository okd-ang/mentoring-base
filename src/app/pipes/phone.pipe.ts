import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPhoneNumber',
  standalone: true,
  pure: true,
})
export class CustomPhoneNumberPipe implements PipeTransform {
  transform(phoneNumber: string | undefined): string {
    return phoneNumber ? phoneNumber.split('-').join('') : '';
  }
}
