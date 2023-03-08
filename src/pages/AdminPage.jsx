import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Dashboard } from "../components/admin/Dashboard";

export const AdminPage = () => {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);
  const createInventory = () => {
    navigate("/create", { state: categories });
  };

  const createCategory = () => {
    navigate("/createCategory");
  };
  return role && role === "admin" ? (
    <Box>
      <Text fontSize="2xl" align="center">
        Welcome to Admin
      </Text>

      <ButtonGroup mr="10">
        <Button onClick={createInventory}>Create inventory</Button>
        <Button onClick={createCategory}>Create Category</Button>
        <Button>View inventory</Button>
        <Button>View Users</Button>
      </ButtonGroup>

      <Dashboard categories={categories} />
    </Box>
  ) : (
    <div>You dont have permission to access this page</div>
  );
};
