import { ProductDef } from "features/product/product";
import { LocationDef } from "features/user/user";

export interface OrderDetailDef {
  id: number;
  orderId: number;
  createdAt: string;
  price: number;
  productId: number;
  product: ProductDef;
  quantity: number;
}
export interface OrderDef {
  id: number;
  userId: number;
  locationId: number;
  paymentId: number;
  deliveryId: number;
  totalQuantity: number;
  totalMoney: number;
  status: number;
  createdAt: string;
  location?: LocationDef;
  orderDetails?: OrderDetailDef[];
}

export interface OrderParams {
  page: number;
  perPage?: number;
}

export interface OrderListResponse {
  currentPage: number;
  list: OrderDef[];
  totalItems: number;
  totalPages: number;
}

export interface StatisticalParams {
  startTime: string;
  endTime?: string;
}
