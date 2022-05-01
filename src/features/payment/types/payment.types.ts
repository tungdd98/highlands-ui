export interface PaymentDef {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface PaymentParams extends Partial<Omit<PaymentDef, "id">> {
  id?: number | string;
  page: number;
  perPage?: number;
}

export interface PaymentRequest {
  title: string;
  description?: string | null;
}

export interface PaymentListResponse {
  currentPage: number;
  list: PaymentDef[];
  totalItems: number;
  totalPages: number;
}
