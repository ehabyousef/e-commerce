import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductsService } from '../services/products';
import { EMPTY, Observable } from 'rxjs';

export const myDetailsResolver: ResolveFn<Observable<any>> = (route, state) => {
  const id = route.paramMap.get('id');
  const product = inject(ProductsService);
  return id ? product.getSingleProduct(id) : EMPTY;
};
