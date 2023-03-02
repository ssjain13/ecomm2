import { Box, Input } from "@chakra-ui/react";
import React from "react";

export const InputComponent = ({ placeholder, name, handleInputChange }) => {
  return (
    <Box width="30%" mr="10px" mb="10px">
      <Input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        name={name}
        
      />
    </Box>
  );
};
