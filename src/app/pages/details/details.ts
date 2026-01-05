import { AddCart } from './../../core/interface/IProducts';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';

import { RouterLink } from '@angular/router';
import { Cart } from '../../core/services/cart';
import { Notifications } from '../../core/services/notifications';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    GalleriaModule,
    TagModule,
    InputNumberModule,
    FormsModule,
    BreadcrumbModule,
    DividerModule,
    RouterLink,
  ],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  productId: string | null = null;
  product: any = null;
  galleryImages: any[] = [];
  quantity: number = 1;
  price: number = 1;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _Cart: Cart,
    private _productsService: ProductsService,
    private _Notification: Notifications
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.getProductDetails(this.productId);
      }
    });
  }

  getProductDetails(id: string): void {
    this._productsService.getSingleProduct(id).subscribe({
      next: (res: any) => {
        const data = res.data;
        if (data) {
          this.galleryImages = [data.defaultImage, ...(data.images || [])];
          this.product = data;
          this.price = data.price;
        }
      },
      error: (err: any) => {
        console.error('Error fetching product details:', err);
      },
    });
  }

  addCart(data: AddCart) {
    this._Cart.addToCart(data).subscribe({
      next: (res: any) => {
        this._Notification.Toast('success', 'Added to cart', 'Product listed in your cart', 1500);
      },
      error: (err: any) => {
        this._Notification.Toast('error', 'Error', 'Failed to add product to cart', 1500);
      },
    });
  }
}
