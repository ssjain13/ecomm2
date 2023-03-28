import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { saveCategory, updateCategory } from "../../../api";
import { CancelCustomBtn, CustomBtn } from "../../UI-components/CustomBtn";

export const CategoryForm = () => {
  const location = useLocation();

  const [isDisable, setIsDisable] = useState(false);

  const data = location.state;
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [category, setCategory] = useState(
    data ? data.category : { name: "", description: "" }
  );

  const [mode, setMode] = useState("create");
  useEffect(() => {
    if (data && data.category) {
      setMode("edit");
    } else {
      setCategory(category);
    }
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCategory((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdate = () => {
    dispatch(updateCategory(category));

    toast({
      title: `Category updated successfully`,
      status: "success",
      duration: 1000,
    });
    setIsDisable(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const handleCreate = (e) => {
    dispatch(saveCategory(category));

    toast({
      title: `Category created successfully`,
      status: "success",
      duration: 1000,
    });
    setIsDisable(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleCancel = (e) => {
    navigate("/");
  };
  return (
    <Box ml="15px">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          value={category.name}
          name="name"
          onChange={handleChange}
          disabled={isDisable}
        />
        <FormLabel>Description</FormLabel>
        <Textarea
          disabled={isDisable}
          value={category.description}
          name="description"
          onChange={handleChange}
        />
        {mode === "edit" ? (
          <CustomBtn disabled={isDisable} handle={handleUpdate} text="Update" />
        ) : (
          <CustomBtn  disabled={isDisable} handle={handleCreate} text="Create" />
        )}
        <CancelCustomBtn disabled={isDisable} handle={handleCancel} text="Cancel" />
      </FormControl>
    </Box>
  );
};
