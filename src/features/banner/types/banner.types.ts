import { BannerStatusEnum } from "./banner.enums";

export interface BannerDef {
  id: number;
  title: string;
  thumbnail: string;
  link: string;
  status: BannerStatusEnum;
  createdAt: string;
}

export interface BannerParams
  extends Partial<Omit<BannerDef, "id" | "status">> {
  id: number | string;
  status: BannerStatusEnum | string;
  page: number;
  perPage?: number;
}

export interface BannerRequest {
  title?: string | null;
  thumbnail: string | File;
  link?: string | null;
  status: BannerStatusEnum;
}

export interface BannerListResponse {
  currentPage: number;
  list: BannerDef[];
  totalItems: number;
  totalPages: number;
}
