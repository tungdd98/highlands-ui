import { OrderStatusEnum } from "features/order/order";

export const ORDER_TITLE: Record<
  number,
  {
    label: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
  }
> = {
  [OrderStatusEnum.PENDING]: { label: "Pending", color: "info" },
  [OrderStatusEnum.CONFIRMED]: { label: "Confirmed", color: "primary" },
  [OrderStatusEnum.SHIPPING]: { label: "Shipping", color: "warning" },
  [OrderStatusEnum.SUCCESS]: { label: "Success", color: "success" },
  [OrderStatusEnum.CANCELING]: { label: "Canceling", color: "error" },
  [OrderStatusEnum.CANCELED]: { label: "Canceled", color: "secondary" },
};
