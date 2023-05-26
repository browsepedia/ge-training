import { supportsScrollBehavior } from '@angular/cdk/platform';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mark',
  standalone: true,
})
export class MarkPipe implements PipeTransform {
  transform(value: string, mark: string): string {
    const startIndex = value.toLowerCase().indexOf(mark);

    if (startIndex === -1) {
      return value;
    }

    const firstPart = value.substring(0, startIndex);
    const lastPart = value.substring(
      startIndex + mark.length
    );

    const markedPart = value.substring(
      startIndex,
      startIndex + mark.length
    );

    return `${firstPart}<mark>${markedPart}</mark>${lastPart}`;
  }
}
