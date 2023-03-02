import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { checkout } from "../api";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Payment = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  //price_1MOImDSGyTooPOuOtaKEDcLi
  const makePayment = () => {
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
  return <Button onClick={makePayment}>Pay</Button>;
};
