import { ProductStatusEnum, ProductIsHotEnum } from "../types/product.enums";

export const PRODUCT_STATUS_OPTIONS = [
  { value: ProductStatusEnum.DISPLAY, label: "Display" },
  { value: ProductStatusEnum.HIDDEN, label: "Hidden" },
];

export const PRODUCT_HOT_OPTIONS = [
  { value: ProductIsHotEnum.HOT, label: "Hot" },
  { value: ProductIsHotEnum.NORMAL, label: "Normal" },
];
