import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { data } from "../../model/product.json";

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { CancelCustomBtn, CustomBtn } from "../UI-components/CustomBtn";
import { BiCaretDown } from "react-icons/bi";
import { saveProduct, updateProduct } from "../../api";

const initialState = {
  id: "",
  title: "",
  description: "",
  price: "",
  category: "",
  image: "",
  rating: {
    count: 0,
    rate: 0,
  },
};
export const ProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;
  const [product, setProduct] = useState(
    data.product ? data.product : initialState
  );
  const toast = useToast();
  console.log(data);

  const [mode, setMode] = useState("create");
  console.log(mode);
  useEffect(() => {
    if (data.product) {
      setMode("edit");
    } else {
      setProduct(product);
    }
    console.log(product);
  }, []);

  const dispatch = useDispatch();

  const handleCreate = (e) => {
    dispatch(saveProduct(product));
    console.log(product);

    toast({
      title: `Product created successfully`,
      status: "success",
      duration: 1000,
    });

    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/admin");
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProduct((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleUpdate = () => {
    dispatch(updateProduct(product));
    console.log(product);
    toast({
      title: `Product updated successfully`,
      status: "success",
      duration: 1000,
    });

    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };

  const options = data.categories.map((category) => {
    return (
      <option value={category.name} key={category.id}>
        {category.name}
      </option>
    );
  });

  return (
    product && (
      <Box ml="15px">
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
          <Input value={product.price} name="price" type="number" onChange={handleChange} />
          <FormLabel>Category</FormLabel>
          <Select
            width="300px"
            icon={<BiCaretDown />}
            mr="10px"
            variant="filled"
            onChange={handleChange}
            name="category"
            value={product.category}
          >
            {options}
          </Select>

          {mode !== "edit" && (
            <Input name="image" value={product.image} onChange={handleChange} />
          )}

          {mode === "edit" ? (
            <CustomBtn handle={handleUpdate} text="Update" />
          ) : (
            <CustomBtn handle={handleCreate} text="Create" />
          )}
          <CancelCustomBtn handle={handleCancel} text="Cancel" />
        </FormControl>
      </Box>
    )
  );
};
