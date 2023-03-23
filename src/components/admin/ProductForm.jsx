import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";
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

  rating: {
    count: 0,
    rate: 0,
  },
};
export const ProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisable, setIsDisable] = useState(false);

  const formData = new FormData();

  const data = location.state;
  const [product, setProduct] = useState(
    data.product ? data.product : initialState
  );
  const toast = useToast();

  const [mode, setMode] = useState("create");
  useEffect(() => {
    if (data.product) {
      setMode("edit");
    } else {
      setProduct(product);
    }
  }, []);

  const dispatch = useDispatch();

  const handleCreate = (e) => {
    formData.append("data", JSON.stringify(product));
    console.log(formData.get("image"));
    dispatch(saveProduct(formData));
    toast({
      title: `Product created successfully`,
      status: "success",
      duration: 1000,
    });
    setIsDisable(true);
    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  const handleImageUpload = (e) => {
    formData.append(e.target.name, e.target.files[0]);
    console.log(formData.get(e.target.name));
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

    toast({
      title: `Product updated successfully`,
      status: "success",
      duration: 1000,
    });
    setIsDisable(true);
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
          <Input
            value={product.title}
            name="title"
            onChange={handleChange}
            disabled={isDisable}
          />
          <FormLabel>Description</FormLabel>
          <Textarea
            disabled={isDisable}
            value={product.description}
            name="description"
            onChange={handleChange}
          />
          <FormLabel>Price</FormLabel>
          <Input
            disabled={isDisable}
            value={product.price}
            name="price"
            type="number"
            onChange={handleChange}
          />
          <FormLabel>Category</FormLabel>
          <Select
            disabled={isDisable}
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
            <>
              <FormLabel htmlFor="image">Select Image:</FormLabel>
              <Input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                mb="3"
                disabled={isDisable}
                onChange={handleImageUpload}
              />
            </>
          )}

          {mode === "edit" ? (
            <CustomBtn
              disabled={isDisable}
              handle={handleUpdate}
              text="Update"
            />
          ) : (
            <CustomBtn
              disabled={isDisable}
              handle={handleCreate}
              text="Create"
            />
          )}
          <CancelCustomBtn
            disabled={isDisable}
            handle={handleCancel}
            text="Cancel"
          />
        </FormControl>
      </Box>
    )
  );
};
