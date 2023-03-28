import { Alert, Box, Button, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { authenticate } from "../api";


export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "jane@test.com",
    password: "App@12103",
  });

  const navigate = useNavigate();
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
    

    dispatch(authenticate(credentials));
    navigate("/");
  };

  return (
    <Box ml="10">
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
    </Box>
  );
};
