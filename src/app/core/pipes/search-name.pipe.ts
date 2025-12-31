import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interface/IProducts';

@Pipe({
  name: 'searchName',
})
export class SearchNamePipe implements PipeTransform {
  transform(products: IProduct[], searchKey: string): IProduct[] {
    return products.filter((p: IProduct) => p.name.toLowerCase().includes(searchKey.toLowerCase()));
  }
}
