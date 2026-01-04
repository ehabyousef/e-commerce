import { Component } from '@angular/core';
import { ICategory, IProduct } from '../../core/interface/IProducts';
import { ProductsService } from '../../core/services/products';
import { Card } from '../../shared/card/card/card';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { SearchNamePipe } from '../../core/pipes/search-name.pipe';
import { CategoryService } from '../../core/services/category.service';
import { Button } from 'primeng/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
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
    Button,
    RouterLink,
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  constructor(
    private _productService: ProductsService,
    private _CategoryService: CategoryService,
    private _route: ActivatedRoute
  ) {}
  allProducts: IProduct[] = [];
  searchKey: string = '';
  categories: ICategory[] = [];
  categType: string = '';
  ngOnInit(): void {
    this.getCategories();
    this._route.paramMap
      .pipe(
        map((params) => params.get('filter') ?? ''),
        switchMap((id) => {
          this.categType = id;
          if (id === '') {
            return this._productService.allProducts();
          } else {
            return this._productService.filteredProducts(id).pipe(map((res) => res.data));
          }
        })
      )
      .subscribe({
        next: (res) => (this.allProducts = res),
        error: (err) => console.log(err),
      });
  }

  getAllProducts() {
    this._productService.allProducts().subscribe((next) => {
      this.allProducts = next;
      console.log(next);
    });
  }
  getCategories() {
    this._CategoryService.getAllCategories().subscribe((next) => {
      this.categories = next;
      console.log('Categories:', this.categories);
    });
  }
  getFilteredProducts(id: string) {
    this._productService.filteredProducts(id).subscribe((next) => (this.allProducts = next.data));
  }
}
