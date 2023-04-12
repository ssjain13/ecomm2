import { Button } from "@chakra-ui/react";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";

export const BackBtn = ({ navPath="dashboard" }) => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(`/${navPath}`)} leftIcon={<BiArrowBack />}>
      Back
    </Button>
  );
};
