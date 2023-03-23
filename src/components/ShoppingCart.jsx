import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box, Button, Divider, Flex, Image, Text
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeFromCart } from "../redux/cart";
import "../styles/main.style.css";
import { QtyController } from "./qtyController";
import { ShoppingCartHeader } from "./ShoppingCartHeader";
import { ShoppingCartPrice } from "./ShoppingCartPrice";



export const ShoppingCart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      {cartItems.length > 0 && (
        <Box>
          <ShoppingCartHeader />
          <Divider size={"large"} />

          {cartItems &&
            cartItems.map((cartItem) => (
              <Flex key={cartItem.id} mt="20px" ml="10em">
                <Image
                  src={cartItem.url}
                  alt={cartItem.title}
                  borderRadius="md"
                  boxSize="80px"
                  objectFit="cover"
                  mb="10px"
                />
                <Box ml="10px" mr="10px" width="40%">
                  <Text noOfLines={1} fontWeight="bold" mb="10px">
                    {cartItem.title}
                  </Text>
                  <Text noOfLines={[1]} fontSize="14px">
                    {cartItem.description}
                  </Text>
                </Box>
                <Box width="25%">
                  <QtyController qty={cartItem.qty} p={cartItem} />
                </Box>
                <Text color="blue.600" fontSize="xl">
                  Rs.{cartItem.price * cartItem.qty}
                </Text>
                <Button
                  colorScheme={"red"}
                  variant="ghost"
                  leftIcon={<DeleteIcon />}
                  onClick={() => dispatch(removeFromCart(cartItem))}
                />
              </Flex>
            ))}

          <ShoppingCartPrice cartItems={cartItems} />
          <Flex justifyContent={"flex-end"} width="90%" mt="10px" mb="10px">
            <Button colorScheme={"pink"} width="25%" onClick={()=>navigate("/checkout")}>
              Proceed to buy
            </Button>
          </Flex>
        </Box>
      )}

      {cartItems.length < 1 && (
        <Text fontSize="2xl" textAlign={"center"} color="GrayText">
          Your shopping cart is empty!
        </Text>
      )}
    </>
  );
};
