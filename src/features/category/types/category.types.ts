import { CategoryTypesEnum } from "./category.enums";

export interface CategoryDef {
  id: number;
  title: string;
  description: string;
  type: CategoryTypesEnum;
  createdAt: string;
}

export interface CategoryParams
  extends Partial<Omit<CategoryDef, "id" | "type">> {
  id?: number | string;
  type?: CategoryTypesEnum | string;
  page: number;
  perPage?: number;
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
