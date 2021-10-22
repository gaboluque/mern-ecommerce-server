export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export interface IProductDTO {
  _id?: string;
  id?: string | number;
  name?: string;
  description?: string;
  price?: number;
  images?: string[];
}
