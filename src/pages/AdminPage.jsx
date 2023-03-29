import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Progress,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchProducts, fetchProductsCount } from "../api";
import { ChartCompo } from "../components/UI-components/chart";

export const AdminPage = () => {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { isSuccess, error, loading } = useSelector((state) => state.user);

  const categoriesState = useSelector((state) => state.categories);
  const productState = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const createInventory = () => {
    navigate("/create", { state: { categories: categoriesState.categories } });
  };
  const checkLoading = () => {
    return loading || categoriesState.loading || productState.loading;
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
  const viewUsers = () => {
    navigate("/viewUsers");
  };
  useEffect(() => {    
      dispatch(fetchProductsCount());
  }, []);

  return (
    <Box>
      {checkLoading() && <Progress size="xs" isIndeterminate mt={"30px"} />}
      {!checkLoading() && isSuccess && role === "admin" && (
        <>
         <ButtonGroup mr="10">
            <Button onClick={createInventory}>Add Product</Button>
            <Button onClick={createCategory}>Add Category</Button>
            <Button onClick={viewCategories}>View Categories</Button>
            <Button onClick={viewProducts}>View Products</Button>
            <Button onClick={viewUsers}>View Users</Button>
          </ButtonGroup>
          <ChartCompo />
        </>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Login Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!loading && isSuccess && role !== "admin" && (
        <div>You dont have permission to access this page</div>
      )}
    </Box>
  );
};
