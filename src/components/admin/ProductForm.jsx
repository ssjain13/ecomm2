import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { data } from "../../model/product.json";

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { updateProduct } from "../../redux/product";

export const ProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const productData = location.state;
  const [product, setProductData] = useState(productData);
  const toast = useToast();
  const [mode, setMode] = useState("create");
  useEffect(() => {
    console.log(data);
    if (productData) {
      setMode("edit");
    } else {
      setProductData(data);
    }
    console.log(product);
  }, []);

  const dispatch = useDispatch();

  const handleCreate = (data) => {
    
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProductData((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleUpdate = () => {
    dispatch(updateProduct(product));

    toast({
      title: `Product updated successfully`,
      status: "success",
      duration: 1000,
    });

    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };
  return (
    product && (
      <Box>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input value={product.title} name="title" onChange={handleChange} />
          <FormLabel>Description</FormLabel>
          <Textarea
            value={product.description}
            name="description"
            onChange={handleChange}
          />
          <FormLabel>Price</FormLabel>
          <Input value={product.price} name="price" onChange={handleChange} />
          <FormLabel>Category</FormLabel>
          <Input
            value={product.category}
            name="category"
            onChange={handleChange}
          />
          {mode === "edit" ? (
            <Button onClick={handleUpdate}>Update</Button>
          ) : (
            <Button onClick={handleCreate}>Create</Button>
          )}
        </FormControl>
      </Box>
    )
  );
};
