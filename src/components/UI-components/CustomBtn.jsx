import { Button } from "@chakra-ui/react";
import React from "react";

export const CustomBtn = ({ handle, text, disabled }) => {
  return (
    <Button onClick={handle} colorScheme="blue" ml="10px" mr="10px" mt="10px" disabled={disabled}>
      {text}
    </Button>
  );
};


export const CancelCustomBtn = ({ handle, text, disabled }) => {
    return (
      <Button onClick={handle} colorScheme="facebook" ml="10px" mr="10px" mt="10px" disabled={disabled}>
        {text}
      </Button>
    );
  };