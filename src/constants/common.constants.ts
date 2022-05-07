import FlagEn from "assets/images/flag-en.png";
import FlagVi from "assets/images/flag-vi.png";
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
  "https://images.pexels.com/photos/11334016/pexels-photo-11334016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1391487/pexels-photo-1391487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { lng: "en", flag: FlagEn, title: "English" },
  { lng: "vi", flag: FlagVi, title: "Vietnamese" },
];

export enum StatusEnum {
  HIDDEN,
  DISPLAY,
}
