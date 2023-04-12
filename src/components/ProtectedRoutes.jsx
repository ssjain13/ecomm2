import React from "react";
import {  useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRoutes = ({ isAllowed, children, redirectTo }) => {
  const { loading } = useSelector((state) => state.user);
  if (!isAllowed && !loading) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};
