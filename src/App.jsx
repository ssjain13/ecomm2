import { Alert, AlertIcon, Box, Progress } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { fetchCategories, fetchProducts } from "./api";
import { Filters } from "./components/filter";
import { Pageheader } from "./components/Pageheader";
import { ProductGrid } from "./components/ProductGrid";
import { ShoppingAccordion } from "./components/ShoppingAccordion";
import { ShoppingCart } from "./components/ShoppingCart";

import { Login } from "./pages/Login";
import { SuccessPage } from "./pages/SuccessPage";

import { Register } from "./components/user/Register";

function App() {
  const selectorData = useSelector((state) => state.categories);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { loading, error, filteredData } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <Pageheader />
      <Routes>
        <Route path="/cart" element={<ShoppingCart />}></Route>
        {cartItems && (
          <Route path="/checkout" element={<ShoppingAccordion />}></Route>
        )}
        <Route path="/success" element={<SuccessPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <Box>
              <Filters categories={selectorData.categories} />
              {loading && selectorData.loading && (
                <Progress size="xs" isIndeterminate mt={"30px"} />
              )}
              {!loading && !selectorData.loading && (
                <ProductGrid products={filteredData} />
              )}
              {error && selectorData.error && (
                <Alert status="error">
                  <AlertIcon />
                  There was an error processing your request
                </Alert>
              )}
            </Box>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
