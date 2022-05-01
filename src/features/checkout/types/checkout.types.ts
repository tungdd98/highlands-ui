import { ProductDef } from "features/product/product";
import { LocationDef } from "features/user/user";

export interface PaymentAndDeliveryForm {
  deliveryId: number | string;
  paymentId: number | string;
}

export interface CartDef {
  product: ProductDef;
  quantity: number;
}

export type LocationForm = Omit<LocationDef, "id" | "userId">;

export type LocationRequest = Omit<Partial<LocationDef>, "id">;

export interface CartRequest {
  product: {
    id: number;
    price: number;
    quantity: number;
  };
  quantity: number;
}
export interface OrderRequest {
  userId: number;
  locationId: number;
  paymentId: number;
  deliveryId: number;
  totalQuantity: number;
  totalMoney: number;
  carts: CartRequest[];
}

export interface OrderDetail extends OrderRequest {
  id: number;
  createdAt: string;
}
