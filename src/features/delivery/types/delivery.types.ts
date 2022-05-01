export interface DeliveryDef {
  id: number;
  title: string;
  price: number;
  createdAt: string;
}

export interface DeliveryParams extends Partial<Omit<DeliveryDef, "id">> {
  id?: number | string;
  page: number;
  perPage?: number;
}

export interface DeliveryRequest {
  title: string;
  price?: number | string | null;
}

export interface DeliveryListResponse {
  currentPage: number;
  list: DeliveryDef[];
  totalItems: number;
  totalPages: number;
}
