import * as yup from "yup";

import {
  PaymentTypesEnum,
  DeliveryTypesEnum,
  PaymentAndDeliveryForm,
  LocationForm,
  CartDef,
} from "features/checkout/checkout";
import { DeliveryDef } from "features/delivery/delivery";
import { PaymentDef } from "features/payment/payment";

export const schemaLocation = yup.object().shape({
  address: yup.string().required(),
  phone: yup.string().required(),
  name: yup.string().required(),
});

export const initialValuesLocation: LocationForm = {
  address: "",
  phone: "",
  name: "",
};

export const initialValuesPayment: PaymentAndDeliveryForm = {
  deliveryId: DeliveryTypesEnum.STANDARD,
  paymentId: PaymentTypesEnum.CASH,
};

export const setInitialValuesPayment = (
  deliveries: DeliveryDef[] | null,
  payments: PaymentDef[] | null,
  initValues: {
    paymentId: number | null;
    deliveryId: number | null;
  }
): PaymentAndDeliveryForm => {
  return {
    deliveryId: deliveries ? initValues.deliveryId || deliveries[0].id : "",
    paymentId: payments ? initValues.paymentId || payments[0].id : "",
  };
};

export const calculateTotal = (carts: Record<number, CartDef>) => {
  const total = Object.values(carts).reduce(
    (acc: { totalMoney: number; totalQuantity: number }, item) => {
      return {
        totalMoney: acc.totalMoney + item.product.price * item.quantity,
        totalQuantity: acc.totalQuantity + item.quantity,
      };
    },
    { totalMoney: 0, totalQuantity: 0 }
  );

  return total;
};
