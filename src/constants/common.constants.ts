import FlagEn from "assets/images/flag-en.png";
import FlagVi from "assets/images/flag-vi.png";
import ImageProduct1 from "assets/images/products/product1.webp";
import ImageProduct10 from "assets/images/products/product10.webp";
import ImageProduct2 from "assets/images/products/product2.webp";
import ImageProduct3 from "assets/images/products/product3.webp";
import ImageProduct4 from "assets/images/products/product4.webp";
import ImageProduct5 from "assets/images/products/product5.webp";
import ImageProduct6 from "assets/images/products/product6.webp";
import ImageProduct7 from "assets/images/products/product7.webp";
import ImageProduct8 from "assets/images/products/product8.webp";
import ImageProduct9 from "assets/images/products/product9.webp";
import { LanguageOption } from "types/app.types";

export enum ModesScreenEnum {
  CREATE = "create",
  EDIT = "edit",
  DUPLICATE = "duplicate",
  VIEW = "view",
}

export const DEFAULT_HIDE_SNACKBAR = 2000;

export const ORIENTATION_TO_ANGLE = {
  "3": 180,
  "6": 90,
  "8": -90,
};

export enum AspectRatioEnum {
  SIXTEEN_TO_NINE = 16 / 9,
  NINE_TO_SIXTEEN = 9 / 16,
  ONE_TO_ONE = 1,
  STREAM_IMAGE_WIDTH = 326,
  STREAM_IMAGE_HEIGHT = 183,
  FIVE_TO_TWO = 5 / 2,
  TWO_TO_ONE = 2 / 1,
  THREE_TO_FOUR = 3 / 4,
  TEN_TO_FOUR = 10 / 4,
}

export const RANDOM_IMAGES_ERROR = [
  ImageProduct1,
  ImageProduct2,
  ImageProduct3,
  ImageProduct4,
  ImageProduct5,
  ImageProduct6,
  ImageProduct7,
  ImageProduct8,
  ImageProduct9,
  ImageProduct10,
];

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { lng: "en", flag: FlagEn, title: "English" },
  { lng: "vi", flag: FlagVi, title: "Vietnamese" },
];

export enum StatusEnum {
  HIDDEN,
  DISPLAY,
}
