import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  AccordionIcon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CheckoutPage } from "../pages/CheckoutPage";
import { OrderSummary } from "./OrderSummary";
import { Payment } from "./Payment";

const setAttr = {
  isBilling: false,
  isSummary: true,
  isPayment: true,
  accordionIndex: 0,
};

export const ShoppingAccordion = () => {
  const [accordionProps, setAccordionProps] = useState(setAttr);

  const { cartItems } = useSelector((state) => state.cart);
  console.log(accordionProps);
  return (
    cartItems.length > 0 && (
      <Accordion allowToggle width="85%" index={accordionProps.accordionIndex}>
        <AccordionItem isDisabled={accordionProps.isBilling}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Billing Details
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={1}>
            <CheckoutPage setAccordionProps={setAccordionProps} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem isDisabled={accordionProps.isSummary}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Order Summary
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <OrderSummary setAccordionProps={setAccordionProps} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem isDisabled={accordionProps.isPayment}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Payment Options
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Payment />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
  );
};
