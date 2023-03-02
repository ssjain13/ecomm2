import { Button, CardFooter, Flex } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/cart";

export const CartBtn = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const getQty = () => {
    const isPresent = cartItems.find((item) => item.id === product.id);
    if (isPresent) {
      return isPresent.qty;
    }
    return 0;
  };
  const navigate = useNavigate();
  return (
    <CardFooter>
      {getQty() > 0 && (
        <Flex justifyContent={"space-between"} width="90%">
          <Button
            mr="10px"
            colorScheme="blue"
            onClick={() => navigate("/cart")}
          >
            Go to cart
          </Button>
          <Button
            colorScheme="red"
            onClick={() => dispatch(removeFromCart(product))}
          >
            Remove from cart
          </Button>
        </Flex>
      )}

      {getQty() === 0 && (
        <Button
          width={"100%"}
          onClick={() => dispatch(addToCart(product))}
          colorScheme="whatsapp"
        >
          Add to Cart
        </Button>
      )}
    </CardFooter>
  );
};
