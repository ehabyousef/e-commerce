import { Component } from '@angular/core';
import { IProduct } from '../../core/interface/IProducts';
import { ProductsService } from '../../core/services/products';
import { Card } from '../../shared/card/card/card';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { SearchNamePipe } from '../../core/pipes/search-name.pipe';
@Component({
  selector: 'app-products',
  imports: [
    Card,
    FormsModule,
    SearchNamePipe,
    InputIcon,
    IconField,
    InputTextModule,
    ɵInternalFormsSharedModule,
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  constructor(private _productService: ProductsService) {}
  allProducts: IProduct[] = [];
  searchKey: string = '';
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productService.allProducts().subscribe((next) => {
      this.allProducts = next;
      console.log(next);
    });
  }
}
