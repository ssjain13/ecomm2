import { Box, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { saveCategory } from "../../api";
import { CancelCustomBtn, CustomBtn } from "../UI-components/CustomBtn";

export const CategoryForm = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

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
  const handleCreate = (e) => {
    
    dispatch(saveCategory(category));

    toast({
      title: `Category created successfully`,
      status: "success",
      duration: 1000,
    });

    setTimeout(() => {
      navigate("/admin");
    }, 2000);
    
  };

  const handleCancel = (e) => {};
  return (
    <Box ml="15px">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={category.name} name="name" onChange={handleChange} />
        <FormLabel>Description</FormLabel>
        <Textarea
          value={category.description}
          name="description"
          onChange={handleChange}
        />
        <CustomBtn handle={handleCreate} text="Create" />

        <CancelCustomBtn handle={handleCancel} text="Cancel" />
      </FormControl>
    </Box>
  );
};
