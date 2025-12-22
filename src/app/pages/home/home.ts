import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Card } from '../../shared/card/card/card';
import { UserData } from '../../core/services/user-data';
import { IProduct } from '../../core/interface/IProducts';
@Component({
  selector: 'app-home',
  imports: [CarouselModule, ButtonModule, TagModule, CommonModule, Card],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  products: IProduct[] = [];
  constructor(private _userData: UserData) {}
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
    this._userData
      .allProducts()
      .subscribe((next) => ((this.products = next.slice(0, 4)), console.log(this.products)));
  }
}
