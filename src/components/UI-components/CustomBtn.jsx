import { Button } from "@chakra-ui/react";
import React from "react";

export const CustomBtn = ({ handle, text }) => {
  return (
    <Button onClick={handle} colorScheme="blue" ml="10px" mr="10px" mt="10px">
      {text}
    </Button>
  );
};


export const CancelCustomBtn = ({ handle, text }) => {
    return (
      <Button onClick={handle} colorScheme="facebook" ml="10px" mr="10px" mt="10px">
        {text}
      </Button>
    );
  };