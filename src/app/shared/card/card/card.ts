import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { AddCart, CartItemResponse, IProduct } from '../../../core/interface/IProducts';
import { RouterLink } from '@angular/router';
import { Cart } from '../../../core/services/cart';
import { Notifications } from '../../../core/services/notifications';

@Component({
  selector: 'app-card',
  imports: [Tag, Button, NgStyle, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card implements OnInit {
  constructor(private _cart: Cart, private _Notification: Notifications) {}

  cartProducts: CartItemResponse[] = [];
  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products: IProduct[] = [];

  ngOnInit() {
    this.getCart();
  }

  addToCart(data: AddCart) {
    this._cart.addToCart(data).subscribe({
      next: (response) => {
        console.log('Added to cart:', response);
        this.getCart();
        this._cart.cartUpdated.next();
        this._Notification.Toast('success', 'added to cart', 'listed in your cart', 1500);
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this._Notification.Toast('error', 'not added to cart', 'an expected error', 1000);
        // Handle error (show toast notification, etc.)
      },
    });
  }

  removeFromCart(productId: string) {
    this._cart.removeFromCart(productId).subscribe({
      next: (response) => {
        console.log('removed from cart:', response);
        this.getCart();
        this._cart.cartUpdated.next();
        this._Notification.Toast('warn', 'removed from cart', 'unlisted from your cart', 1500);
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this._Notification.Toast('error', 'not added to cart', 'an expected error', 1000);
        // Handle error (show toast notification, etc.)
      },
    });
  }

  getCart() {
    this._cart.getCartProducts().subscribe({
      next: (response) => {
        // Store cart products separately, don't overwrite Products input
        this.cartProducts = response.data.products || [];
        console.log(this.cartProducts);
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
        // If unauthorized, handle accordingly (redirect to login, etc.)
        if (error.status === 401) {
          // User is not authenticated, cart will be empty
          this.cartProducts = [];
        }
      },
    });
  }

  isProductInCart(ProdID: string): boolean {
    return this.cartProducts.some((e) => e.product._id === ProdID);
  }
}
