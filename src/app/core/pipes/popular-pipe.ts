import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'popular',
})
export class PopularPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
