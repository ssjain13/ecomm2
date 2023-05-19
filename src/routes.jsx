import React from "react";
import { Route, Routes } from "react-router";

import { AdminPage } from "./pages/AdminPage";
import { Home } from "./pages/Home";

import { Login } from "./pages/Login";
import { SuccessPage } from "./pages/SuccessPage";
import { Register } from "./components/admin/Register";
import { Dashboard } from "./components/admin/Dashboard";
import { CategoryDashboard } from "./components/admin/CategoryDashboard";
import { Inventory } from "./pages/Inventory";
import { CategoryForm } from "./components/admin/CategoryForm";
import { ProductForm } from "./components/admin/ProductForm";

export default () => {
  return (
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<ShoppingAccordion />}></Route>
      <Route path="/cart" element={<ShoppingCart />}></Route>

      <Route path="/viewProducts" element={<Dashboard />} />

      <Route path="/viewCategories" element={<CategoryDashboard />} />

      <Route path="/create" element={<ProductForm />} />
      <Route path="/createCategory" element={<CategoryForm />} />
      <Route path="/product/edit" element={<ProductForm />} />
      <Route path="/category/edit" element={<CategoryForm />} />
    </Route>
  );
};
