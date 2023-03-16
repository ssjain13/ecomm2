import { Box, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

import { useDispatch } from "react-redux";
import { registerUser } from "../../api";
import { useNavigate } from "react-router";
export const Register = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (password === confirmPassword && passwordScore >= 3) {
      user.password = password;

      dispatch(registerUser(user));
      toast({
        title: `User account created successfully`,
        status: "success",
        duration: 1000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast({
        title: passwordScore < 3 ? `Weak password` : `Passwords do not match`,
        status: "error",
        duration: 1000,
      });
      setPassword("");
      setConfirmPassword("");
    }
  };

  const handlePassword = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Box ml="10">
      <Box width="80" mb="5">
        <Input
          placeholder="Display Name"
          type="text"
          name="displayName"
          onChange={handleInputChange}
          value={user.displayName}
        />
      </Box>
      <Box width="80" mb="5">
        <Input
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleInputChange}
          value={user.email}
        />
      </Box>

      <Box width="80" mb="5">
        <Input
          placeholder="Password"
          type="password"
          name="password"
          onChange={handlePassword}
          value={password}
        />
        <PasswordStrengthBar
          password={password}
          minLength={5}
          onChangeScore={(score, feedback) => {
            setPasswordScore(score);
          }}
        />
      </Box>

      <Box width="80" mb="5">
        <Input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={handlePassword}
          value={confirmPassword}
        />
      </Box>
      <Box mb="5">
        <Button
          colorScheme={"green"}
          width="40"
          type="submit"
          name="login"
          onClick={handleRegister}
        >
          Create an account
        </Button>
      </Box>
    </Box>
  );
};
