import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { checkout } from "../api";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Payment = ({ cartItems, accordionProps }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const { userModel, isAuthenticated } = useSelector((state) => state.user);

  //price_1MOImDSGyTooPOuOtaKEDcLi
  const makePayment = () => {
    const orderData = {
      products: cartItems,
      totalAmount: accordionProps.amount,
      customer: userModel.uid,
    };

    console.log(orderData);

    const res = checkout({
      id: "price_1MOImDSGyTooPOuOtaKEDcLi",
      qty: 1,
      price: 100,
    }).then((data) => {
      window.location.replace(data);
      toast({
        title: `Payment completed successfully`,
        status: "success",
        isClosable: true,
      });
    });
  };
  return <Button onClick={makePayment} disabled={!isAuthenticated}>Pay</Button>;
};
