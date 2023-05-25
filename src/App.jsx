import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { Pageheader } from "./components/Pageheader";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { CategoryDashboard } from "./components/admin/categories/CategoryDashboard";
import { CategoryForm } from "./components/admin/categories/CategoryForm";
import { ProductForm } from "./components/admin/products/ProductForm";
import { ProductsDashboard } from "./components/admin/products/ProductsDashboard";
import { Register } from "./components/admin/users/Register";
import { UserDashboard } from "./components/admin/users/UserDashboard";
import { AdminPage } from "./pages/AdminPage";
import { Login } from "./pages/Login";

function App() {
  const selectorData = useSelector((state) => state.categories);
  const { userModel, userList, isAuthenticated } = useSelector(
    (state) => state.user
  );

  return (
    <>
      <Pageheader />
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes isAllowed={isAuthenticated} />}>
          <Route path="/dashboard" element={<AdminPage />} />
          <Route
            path="/viewProducts"
            element={<ProductsDashboard categories={selectorData.categories} />}
          />
          <Route
            path="/viewCategories"
            element={<CategoryDashboard categories={selectorData.categories} />}
          />
          <Route
            path="/viewUsers"
            element={<UserDashboard currentUser={userModel} users={userList} />}
          />
          <Route path="/create" element={<ProductForm />} />
          <Route path="/createCategory" element={<CategoryForm />} />
          <Route path="/product/edit" element={<ProductForm />} />
          <Route path="/category/edit" element={<CategoryForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
