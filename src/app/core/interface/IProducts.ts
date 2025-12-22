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
}

export interface IProductImage {
  id: string;
  url: string;
}
