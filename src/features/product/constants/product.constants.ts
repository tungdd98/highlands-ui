import {
  ProductStatusEnum,
  ProductIsHotEnum,
  SortQueryEnum,
} from "../types/product.enums";

export const PRODUCT_STATUS_OPTIONS = [
  { value: ProductStatusEnum.DISPLAY, label: "Display" },
  { value: ProductStatusEnum.HIDDEN, label: "Hidden" },
];

export const PRODUCT_HOT_OPTIONS = [
  { value: ProductIsHotEnum.HOT, label: "Hot" },
  { value: ProductIsHotEnum.NORMAL, label: "Normal" },
];

export const DEFAULT_PER_PAGE = 9;

export const DEFAULT_SEARCH_PRICE = {
  MIN: 0,
  MAX: 1000000,
  STEP: 10000,
  DEFAULT: 100000,
};

export const SORT_QUERY_OPTIONS = [
  { value: SortQueryEnum.NAME_ASC, label: "Name, A to Z" },
  { value: SortQueryEnum.NAME_DESC, label: "Name, Z to A" },
  { value: SortQueryEnum.PRICE_ASC, label: "Price, low to high" },
  { value: SortQueryEnum.PRICE_DESC, label: "Price, high to low" },
  { value: SortQueryEnum.CREATED_AT_ASC, label: "Oldest creation date" },
  { value: SortQueryEnum.CREATED_AT_DESC, label: "Latest creation date" },
];

export const DAYS_NEW_PRODUCT = 7;
