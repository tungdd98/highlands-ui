export interface LocationDef {
  id: number;
  userId: number;
  address: string;
  phone: string;
  name: string;
}

export interface UserDef {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export interface UserParams extends Partial<Omit<UserDef, "id">> {
  id: number | string;
  page: number;
  perPage?: number;
}

export interface UserRequest {
  email?: string;
  name: string;
}

export interface UserListResponse {
  currentPage: number;
  list: UserDef[];
  totalItems: number;
  totalPages: number;
}
