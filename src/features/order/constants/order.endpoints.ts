export enum OrderEndpointsEnum {
  GET_ALL = "/orders",
  UPDATE_STATUS = "/orders/update_status_order/:orderId",
  GET_ORDER_DETAIL = "/orders/find_by_order_id/:orderId",
}
