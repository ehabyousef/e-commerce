import { NgStyle } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { IProduct } from '../../../core/interface/IProducts';

@Component({
  selector: 'app-card',
  imports: [Tag, Button, NgStyle],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products: IProduct[] = [];

  // products = [
  //   {
  //     name: 'Bamboo Watch',
  //     image: 'bamboo-watch.jpg',
  //     description: 'Product Description',
  //     price: 65,
  //     rating: 5,
  //     category: 'Accessories',
  //     inventoryStatus: 'In Stock',
  //     ratingCount: 146,
  //     img: 'https://tree-stores.com/cdn/shop/files/22_9658bc07-2308-4394-ba34-b98fa60aefc3.png?v=1763554940&width=2000',
  //   },
  //   {
  //     name: 'Black Watch',
  //     image: 'black-watch.jpg',
  //     description: 'Product Description',
  //     price: 72,
  //     rating: 4,
  //     category: 'Accessories',
  //     inventoryStatus: 'In Stock',
  //     ratingCount: 120,
  //     img: 'https://tree-stores.com/cdn/shop/files/9_46224fa4-6eeb-4cce-a5da-5dba02a72d3a.png?v=1759937154&width=2000',
  //   },
  //   {
  //     name: 'Black Watch',
  //     image: 'black-watch.jpg',
  //     description: 'Product Description',
  //     price: 72,
  //     rating: 4,
  //     category: 'Accessories',
  //     inventoryStatus: 'In Stock',
  //     ratingCount: 120,
  //     img: 'https://tree-stores.com/cdn/shop/files/9_46224fa4-6eeb-4cce-a5da-5dba02a72d3a.png?v=1759937154&width=2000',
  //   },
  //   {
  //     name: 'Black Watch',
  //     image: 'black-watch.jpg',
  //     description: 'Product Description',
  //     price: 72,
  //     rating: 4,
  //     category: 'Accessories',
  //     inventoryStatus: 'In Stock',
  //     ratingCount: 120,
  //     img: 'https://tree-stores.com/cdn/shop/files/9_46224fa4-6eeb-4cce-a5da-5dba02a72d3a.png?v=1759937154&width=2000',
  //   },
  //   {
  //     name: 'Black Watch',
  //     image: 'black-watch.jpg',
  //     description: 'Product Description',
  //     price: 72,
  //     rating: 4,
  //     category: 'Accessories',
  //     inventoryStatus: 'In Stock',
  //     ratingCount: 120,
  //     img: 'https://tree-stores.com/cdn/shop/files/9_46224fa4-6eeb-4cce-a5da-5dba02a72d3a.png?v=1759937154&width=2000',
  //   },
  //   {
  //     name: 'Black Watch',
  //     image: 'black-watch.jpg',
  //     description: 'Product Description',
  //     price: 72,
  //     rating: 4,
  //     category: 'Accessories',
  //     inventoryStatus: 'Out of Stock',
  //     ratingCount: 120,
  //     img: 'https://tree-stores.com/cdn/shop/files/9_46224fa4-6eeb-4cce-a5da-5dba02a72d3a.png?v=1759937154&width=2000',
  //   },
  // ];
}
