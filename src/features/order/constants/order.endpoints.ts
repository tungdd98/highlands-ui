export enum OrderEndpointsEnum {
  GET_ALL = "/orders",
  UPDATE_STATUS = "/orders/update_status_order/:orderId",
  GET_ORDER_DETAIL = "/orders/find_by_order_id/:orderId",
  GET_TOTAL_QUANTITY_COMPLETED = "/orders/total_quantity_orders_completed",
  GET_TOTAL_MONEY_COMPLETED = "/orders/total_money_orders_completed",
  GET_TOTAL_ORDER_COMPLETED = "/orders/total_orders_completed",
  GET_TOTAL_ORDER = "/orders/total_orders",
}
