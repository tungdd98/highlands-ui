export enum ProductPathsEnum {
  LIST = "/admin/products",
  EDIT = "/admin/products/:mode(create|edit|duplicate)/:productId?",
  CLIENT_LIST = "/category/:categoryId",
  CLIENT_DETAIL = "/product/:productId",
}
