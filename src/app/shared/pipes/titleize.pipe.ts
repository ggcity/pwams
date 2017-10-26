import { Pipe, PipeTransform } from '@angular/core';

/*
 * Title case text
 * Usage:
 *   string | titleize
*/

declare var inflection: any;

@Pipe({ name: 'titleize' })
export class TitleizePipe implements PipeTransform {
  transform(value: string): string {
    return inflection.titleize(value);
  }
}
