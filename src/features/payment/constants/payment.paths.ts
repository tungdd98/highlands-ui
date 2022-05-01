export enum PaymentPathsEnum {
  LIST = "/admin/payments",
  EDIT = "/admin/payments/:mode(create|edit|duplicate)/:paymentId?",
}
