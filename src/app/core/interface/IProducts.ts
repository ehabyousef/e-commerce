export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  status: 'new' | 'sale' | 'out-of-stock' | string;
  availableItems: number;
  category: string;
  subCategory: string;
  createdBy: string;
  defaultImage: IProductImage;
  images: IProductImage[];
  createdAt: string;
  updatedAt: string;
  finalPrice: string;
  id: string;
  quantity?: number | 1;
}

export interface IProductImage {
  id: string;
  url: string;
}

export interface AddCart {
  productId?: string | null;
  quantity?: number | 1;
  price?: number;
}

interface Product {
  id: string;
  _id: string;
  name: string;
  price: number;
  finalPrice: string;
  defaultImage: IProductImage;
}

export interface CartItemResponse {
  price: number;
  quantity: number;
  product: Product;
}

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  slug: string;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}
