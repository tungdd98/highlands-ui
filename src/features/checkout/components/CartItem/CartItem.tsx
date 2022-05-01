import React, { FC, memo, useState } from "react";

import { DeleteRounded } from "@mui/icons-material";
import {
  TableRow,
  TableCell,
  Box,
  Typography,
  IconButton,
} from "@mui/material";

import PreviewImage from "components/PreviewImage/PreviewImage";
import QuantityInput from "components/QuantityInput/QuantityInput";
import { AspectRatioEnum } from "constants/common.constants";
import { CartDef } from "features/checkout/checkout";
import { toCurrency } from "helpers/converts/currency";

interface CartItemProps {
  cart: CartDef;
  handleDeleteCart: (id: number) => void;
}

const CartItem: FC<CartItemProps> = ({ cart, handleDeleteCart }) => {
  const [value, setValue] = useState(cart.quantity);

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ pr: 1 }}>
            <PreviewImage
              aspectRatio={AspectRatioEnum.THREE_TO_FOUR}
              src={cart.product.thumbnail}
              width={60}
            />
          </Box>
          <Typography variant="body2" fontWeight={500}>
            {cart.product.title}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{toCurrency(cart.product.price)}</TableCell>
      <TableCell>
        <QuantityInput
          maxQuantity={cart.product.quantity}
          value={value}
          setValue={setValue}
          hideQuantityText
          productId={cart.product.id}
        />
      </TableCell>
      <TableCell>{toCurrency(cart.product.price * cart.quantity)}</TableCell>
      <TableCell>
        <IconButton
          size="small"
          color="error"
          onClick={() => handleDeleteCart(cart.product.id)}
        >
          <DeleteRounded />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default memo(CartItem);
