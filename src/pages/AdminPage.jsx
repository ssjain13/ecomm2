import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchProducts, fetchProductsCount } from "../api";
import { Dashboard } from "../components/admin/Dashboard";

export const AdminPage = () => {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { isSuccess, error } = useSelector((state) => state.user);

  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const createInventory = () => {
    navigate("/create", { state: { categories: categories } });
  };

  const createCategory = () => {
    navigate("/createCategory");
  };
  const viewProducts = () => {
    navigate("/viewProducts");
  };
  const viewCategories = () => {
    navigate("/viewCategories");
  };

  const loadData = () => {
    categories &&
      categories.map((category) => {
        dispatch(fetchProductsCount(category.name));
      });
  };

  return isSuccess && role === "admin" ? (
    <Box>
      <Text fontSize="2xl" align="center">
        Welcome to Admin
      </Text>

      <ButtonGroup mr="10">
        <Button onClick={createInventory}>Add Product</Button>
        <Button onClick={createCategory}>Add Category</Button>
        <Button onClick={viewCategories}>View Categories</Button>
        <Button onClick={viewProducts}>View Products</Button>
      </ButtonGroup>
    </Box>
  ) : error ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Login Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  ) : (
    <div>You dont have permission to access this page</div>
  );
};
