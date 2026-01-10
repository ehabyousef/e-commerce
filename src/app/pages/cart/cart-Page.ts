import { Component, computed } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { Cart } from '../../core/services/cart';
import { Notifications } from '../../core/services/notifications';
import { CartItemResponse } from '../../core/interface/IProducts';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [DataView, ButtonModule, CommonModule, SelectButton, FormsModule, RouterLink],
  templateUrl: './cart-Page.html',
  styleUrl: './cart.scss',
})
export class CartPage {
  readonly layout = signal<'grid' | 'list'>('list');

  products = signal<CartItemResponse[]>([]);

  options = ['list', 'grid'];
  readonly isEmpty = computed(() => this.products().length === 0);
  readonly isLoading = signal<boolean>(false);
  constructor(private _Cart: Cart, private _Notification: Notifications) {}

  ngOnInit() {
    this._Cart.cartUpdated.subscribe(() => this.getCart());
    this.getCart();
  }
  getCart() {
    this.isLoading.set(true);
    this._Cart.getCartProducts().subscribe({
      next: (response: any) => {
        this.products.set(response.data.products);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading cart:', error);
        this.isLoading.set(false);
        this._Notification.Toast('error', 'فشل التحميل', 'حدث خطأ أثناء تحميل السلة', 2000);
      },
    });
  }
  Buy() {
    if (this.isEmpty()) {
      this._Notification.Toast('warn', 'السلة فارغة', 'أضف منتجات للسلة أولاً', 1500);
      return;
    }

    this._Notification.Toast('info', 'قريباً', 'خدمة الشراء ستكون متاحة قريباً', 1500);
  }

  removeItem(productId: string) {
    this._Cart.removeFromCart(productId).subscribe({
      next: () => {
        this.products.update((products) => products.filter((p) => p.product._id !== productId));
        this._Notification.Toast('warn', 'removed from cart', 'unlisted from your cart', 1500);
      },
      error: (error) => {
        console.error('Error removing from cart:', error);
        this._Notification.Toast('error', 'فشل الحذف', 'حدث خطأ أثناء حذف المنتج', 2000);
      },
    });
  }
}
