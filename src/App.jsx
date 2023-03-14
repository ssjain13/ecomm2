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
import { AdminPage } from "./pages/AdminPage";
import { Login } from "./pages/Login";
import { SuccessPage } from "./pages/SuccessPage";
import { Inventory } from "./pages/Inventory";
import { ProductForm } from "./components/admin/ProductForm";
import { CategoryForm } from "./components/admin/CategoryForm";
import { Dashboard } from "./components/admin/Dashboard";
import { CategoryDashboard } from "./components/admin/CategoryDashboard";

function App() {
  const { categories } = useSelector((state) => state.categories);

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { products, loading, error, filteredData } = useSelector(
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
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route
          path="/viewProducts"
          element={<Dashboard categories={categories} />}
        />

        <Route
          path="/viewCategories"
          element={<CategoryDashboard categories={categories} />}
        />

        <Route path="/create" element={<Inventory />} />
        <Route path="/createCategory" element={<CategoryForm />} />

        <Route path="/login" element={<Login />} />
        <Route path="/product/edit" element={<ProductForm />} />
        <Route path="/category/edit" element={<CategoryForm />} />

        <Route
          path="/ecomm2/"
          element={
            <Box>
              <Filters categories={categories} />
              {loading && <Progress size="xs" isIndeterminate mt={"30px"} />}
              {!loading && <ProductGrid products={filteredData} />}
              {error && (
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
