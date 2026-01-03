import { CategoryService } from './../../../core/services/category.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  constructor(private _CategoryService: CategoryService) {}

  getAllCategories() {
    this._CategoryService.getAllCategories().subscribe((next) => console.log(next));
  }
}
