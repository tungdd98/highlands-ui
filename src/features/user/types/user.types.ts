import { RolesEnum } from "./user.enums";

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
  thumbnail: string | null;
  roles: RolesEnum[];
}

export interface UserParams extends Partial<Omit<UserDef, "id">> {
  id: number | string;
  page: number;
  perPage?: number;
}

export interface UserRequest {
  name?: string;
  email?: string;
  roles?: number[];
}

export interface UserFormData extends Omit<UserRequest, "roles"> {
  roles: string[];
}

export interface UserListResponse {
  currentPage: number;
  list: UserDef[];
  totalItems: number;
  totalPages: number;
}
