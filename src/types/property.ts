export interface PropertyOwner {
  idOwner: string;
  name: string;
  address: string;
  photo?: string;
  birthday?: string;
}

export interface PropertySummary {
  idProperty: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image: string;
  ownerName: string;
}

export interface PropertyDetail extends PropertySummary {
  codeInternal?: string;
  year?: number;
  images?: string[];
  owner?: PropertyOwner;
  traces?: PropertyTrace[];
}

export interface PropertyFilters {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface PropertyListData {
  items: PropertySummary[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PropertyTrace {
  idPropertyTrace: string;
  name: string;
  dateSale: string;
  value: number;
  tax: number;
}
