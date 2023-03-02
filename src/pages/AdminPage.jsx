import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DisplayContainer } from "../components/admin/DisplayContainer";

export const AdminPage = () => {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const createInventory = () => {
    
    navigate("/create");
  };
  return role && role === "admin" ? (
    <Box>
      <Text fontSize="2xl" align="center">
        Welcome to Admin
      </Text>

      <ButtonGroup mr="10">
        <Button onClick={createInventory}>Create inventory</Button>
        <Button>View inventory</Button>
        <Button>View Users</Button>
      </ButtonGroup>

      <DisplayContainer/>
    </Box>
  ) : (
    <div>You dont have permission to access this page</div>
  );
};
