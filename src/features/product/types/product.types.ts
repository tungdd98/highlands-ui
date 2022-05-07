import {
  ProductIsHotEnum,
  ProductStatusEnum,
  SortQueryEnum,
} from "./product.enums";

export interface ProductDef {
  id: number;
  title: string;
  description: string;
  content: string;
  include: string;
  thumbnail: string;
  status: ProductStatusEnum;
  quantity: number;
  price: number;
  isHot: ProductIsHotEnum;
  categoryId: number;
  views: number;
  createdAt: string;
}

export interface ProductParams
  extends Partial<Omit<ProductDef, "id" | "isHot" | "status" | "categoryId">> {
  id?: number | string;
  isHot?: ProductIsHotEnum | string;
  status?: ProductStatusEnum | string;
  categoryId?: number | string;
  page: number;
  perPage?: number;
  sort?: SortQueryEnum;
  startPrice?: number;
  endPrice?: number;
}

export interface ProductRequest {
  title: string;
  description?: string | null;
  content?: string | null;
  include?: string | null;
  thumbnail?: string | File | null;
  status: ProductStatusEnum;
  quantity: number | string;
  price: number | string;
  isHot?: ProductIsHotEnum;
  categoryId: number | string | null;
}

export interface ProductListResponse {
  currentPage: number;
  list: ProductDef[];
  totalItems: number;
  totalPages: number;
}
