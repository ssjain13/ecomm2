import {
  Alert,
  Box,
  Button,
  Input,
  Progress,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { login, fetchCategories, fetchProducts } from "../api";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "herif75903@saeoil.com",
    password: "hello@1234",
  });
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(credentials)).then((data) => {
      if (data.error)
        toast({
          title: data.error.message,
          status: "error",
          isClosable: true,
        });

      navigate("/dashboard");
    });
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  };

  return (
    <Box ml="10">
      {loading && <Progress size="xs" isIndeterminate mt={"30px"} />}
      {!loading && (
        <>
          <Box width="80" mb="5">
            <Input
              placeholder="Username"
              type="text"
              name="username"
              onChange={handleInputChange}
              value={credentials.username}
            />
          </Box>
          <Box width="80" mb="5">
            <Input
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleInputChange}
              value={credentials.password}
            />
          </Box>
          <Box mb="5">
            <Button
              colorScheme={"green"}
              width="40"
              type="submit"
              name="login"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
