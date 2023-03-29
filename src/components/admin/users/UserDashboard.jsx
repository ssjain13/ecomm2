import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../api";

export const UserDashboard = ({ currentUser }) => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  },[]);
  return <div>UserDashboard</div>;
};
