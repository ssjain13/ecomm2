import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { OrderItems } from "./orderItems";
import { useEffect } from "react";

export const OrderSummary = ({ setAccordionProps }) => {
  const { billingInfo } = useSelector((state) => state.billing);

  const [amount, setAmount] = useState(0);

  const calculateDiscount = () => {
    const str = `${billingInfo.items.length}`;
    return Math.round((billingInfo.discount / 100) * billingInfo.total);
  };

  const totalAmount = (billingInfo) => {
    const tAmount = Math.round(
      billingInfo.total - (billingInfo.discount / 100) * billingInfo.total
    );

    return tAmount;
  };

  useEffect(() => {
    setAmount(totalAmount(billingInfo));
  }, []);
  return (
    <Box>
      <Text fontSize={"2xl"} mb="10px">
        Price Details
      </Text>

      <Card size="md">
        <CardBody>
          <OrderItems
            label={`Price ( ${billingInfo.items.length} items)`}
            value={billingInfo.total}
          />

          <OrderItems label="Discount" value={`-${calculateDiscount()}`} />
          <OrderItems label="Delivery Charges: " value="FREE" />

          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xl"}>Total Amount</Text>
            <Text fontSize={"xl"} fontWeight="bold">
              {amount}
            </Text>
          </Flex>
        </CardBody>
        <CardFooter>
          <Flex>
            <Button
              colorScheme={"telegram"}
              onClick={() => {
                setAccordionProps((prev) => ({
                  ...prev,
                  isSummary: false,
                  isPayment: false,
                  accordionIndex: 2,
                  amount: amount,
                }));
              }}
            >
              Continue
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Box>
  );
};
