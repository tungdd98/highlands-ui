import { ArticleStatusEnum } from "./article.enums";

export interface ArticleDef {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  author: string;
  source: string;
  status: ArticleStatusEnum;
  categoryId: number;
  createdAt: string;
}

export interface ArticleParams
  extends Partial<Omit<ArticleDef, "id" | "status" | "categoryId">> {
  id: number | string;
  status: ArticleStatusEnum | string;
  categoryId: number | string;
  page: number;
  perPage?: number;
}

export interface ArticleRequest {
  title: string;
  thumbnail: string | File;
  description?: string | null;
  content?: string | null;
  author?: string | null;
  source?: string | null;
  categoryId: number | string;
  status: ArticleStatusEnum;
}

export interface ArticleListResponse {
  currentPage: number;
  list: ArticleDef[];
  totalItems: number;
  totalPages: number;
}
