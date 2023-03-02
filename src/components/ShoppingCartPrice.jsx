import {
  Flex, Text
} from "@chakra-ui/react";
import React from "react";
export const ShoppingCartPrice = ({ cartItems }) => {
  const total = () => {
    let sum = 0;
    cartItems.map((item) => {
      sum += item.price * item.qty;
    });
    return sum.toFixed(2);
  };

  return (
    <Flex justifyContent={"flex-end"} width="90%">
      <Text fontSize="xl">Subtotal ({cartItems.length} items):</Text>
      <Text fontSize="xl" fontWeight="bold">
        Rs. {total()}
      </Text>
    </Flex>
  );
};
