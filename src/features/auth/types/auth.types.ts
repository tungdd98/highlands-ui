import { LocationDef, RolesEnum } from "features/user/user";

export interface RegisterForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export type RegisterRequest = Omit<RegisterForm, "confirmPassword">;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  email: string;
  id: number;
  roles: RolesEnum[];
  name: string;
  thumbnail: string;
  locations: LocationDef[];
}
