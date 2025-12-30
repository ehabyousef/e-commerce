import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interface/IProducts';

@Pipe({
  name: 'popular',
})
export class PopularPipe implements PipeTransform {
  transform(products: IProduct[]): IProduct[] {
    return products.filter((p) => p.status === 'new');
  }
}
