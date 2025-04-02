import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'customTruncate',
  standalone: true,
  pure: true,
})
export class CustomTruncatePipe implements PipeTransform{
  transform(text: string, limit: number = 20): string {
    throw new Error("Method not implemented.");
  }

}
