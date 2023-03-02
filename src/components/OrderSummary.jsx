import {
  Box,
  Button, Card,
  CardBody,
  CardFooter, Flex, Text
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { OrderItems } from "./orderItems";


export const OrderSummary = ({ setAccordionProps }) => {
  const { billingInfo } = useSelector((state) => state.billing);

  const calculateDiscount = () => {
    const str = `${billingInfo.items.length}`;
    return Math.round((billingInfo.discount / 100) * billingInfo.total);
  };
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
              {Math.round(
                billingInfo.total -
                  (billingInfo.discount / 100) * billingInfo.total
              )}
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
