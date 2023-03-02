import {
  Flex,
  Button,
  Image,
  Text,
  Heading,
  Box,
  Badge,
  Spacer,
  ButtonGroup,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FaShoppingCart, FaHome } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";

import "../styles/main.style.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/user";
import { IconButton } from "./UI-components/IconButton";

export const Pageheader = () => {
  let location = useLocation();

  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
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
        {location.pathname !== "/admin" && (
          <Button
            leftIcon={<BiLogIn />}
            mr="10px"
            mt="10px"
            mb="10px"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}

        {location.pathname === "/admin" && (
          <Button
            leftIcon={<BiLogIn />}
            mr="10px"
            mt="10px"
            mb="10px"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}

        {location.pathname === "/ecomm2/" && (
          <>
            <div className="Nav">
              <div className="cart" onClick={() => navigate("/cart")}>
                <div>
                  <IconButton icon={<FaShoppingCart />} />
                </div>
                <div className="badge">{cartItems.length}</div>
              </div>
            </div>
          </>
        )}

        {location.pathname !== "/" && (
          <div className="cart" onClick={() => navigate("/ecomm2/")}>
            <IconButton icon={<FaHome />} />
          </div>
        )}
      </ButtonGroup>
    </Flex>
  );
};
