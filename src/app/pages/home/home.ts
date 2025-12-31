import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Card } from '../../shared/card/card/card';
import { UserData } from '../../core/services/user-data';
import { IProduct } from '../../core/interface/IProducts';
import { PopularPipe } from '../../core/pipes/popular-pipe';
import { ProductsService } from '../../core/services/products';
@Component({
  selector: 'app-home',
  imports: [CarouselModule, ButtonModule, TagModule, CommonModule, Card, PopularPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  products: IProduct[] = [];
  constructor(private _products: ProductsService) {}
  responsiveOptions: any[] | undefined;
  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.getProducts();
  }

  getProducts(): void {
    this._products
      .allProducts()
      .subscribe((next) => ((this.products = next.slice(0, 4)), console.log(this.products)));
  }
}
