import {
  Flex,
  Button,
  Text,
  Heading,
  Box,
  Spacer,
  ButtonGroup,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

import { FaShoppingCart, FaHome } from "react-icons/fa";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { HiUserPlus } from "react-icons/hi2";

import "../styles/main.style.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/user";
import { IconButton } from "./UI-components/IconButton";

export const Pageheader = () => {
  let location = useLocation();

  const navigate = useNavigate();
  const { userModel } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Flex
      pt="20px"
      mb="30px"
      gap="2"
      alignItems="center"
      minWidth="max-content"
    >
      <Heading color={"pink.500"} fontSize="50px">
        Fashionesta
      </Heading>
      <Spacer />
      <ButtonGroup gap="2">
        {location.pathname !== "/" && (
          <>
            <Button
              leftIcon={<BiLogIn />}
              mr="10px"
              mt="10px"
              mb="10px"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              leftIcon={<HiUserPlus />}
              mr="10px"
              mt="10px"
              mb="10px"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </>
        )}

        {location.pathname === "/" && (
          <Flex alignItems={"center"}>
            <Box mr="10px">
              <Text>Welcome {userModel.displayName}</Text>
            </Box>
            <Button
              leftIcon={<BiLogOut />}
              mr="10px"
              mt="10px"
              mb="10px"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Flex>
        )}

        {location.pathname !== "/" && (
          <div className="cart" onClick={() => navigate("/")}>
            <IconButton icon={<FaHome />} />
          </div>
        )}
      </ButtonGroup>
    </Flex>
  );
};
