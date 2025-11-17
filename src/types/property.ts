export interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  image: string;
  owner: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  description?: string;
}

export interface PropertyFilters {
  name: string;
  address: string;
  minPrice: number;
  maxPrice: number;
}
