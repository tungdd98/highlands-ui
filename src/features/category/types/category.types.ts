import { StatusEnum } from "constants/common.constants";

import { CategoryTypesEnum } from "./category.enums";

export interface CategoryDef {
  id: number;
  title: string;
  description: string;
  type: CategoryTypesEnum;
  status: StatusEnum;
  createdAt: string;
}

export interface CategoryParams
  extends Partial<Omit<CategoryDef, "id" | "type" | "status">> {
  id?: number | string;
  type?: CategoryTypesEnum | string;
  status?: StatusEnum;
  perPage?: number;
  page: number;
}

export interface CategoryRequest {
  title: string;
  description?: string | null;
  type: CategoryTypesEnum;
}

export interface CategoryListResponse {
  currentPage: number;
  list: CategoryDef[];
  totalItems: number;
  totalPages: number;
}
