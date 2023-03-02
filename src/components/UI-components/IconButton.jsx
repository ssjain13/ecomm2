import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
export const IconButton = ({ icon }) => {
  
  return (
    <Button
      leftIcon={icon}
      mt="10px"
      mr="10px"     
    ></Button>
  );
};
