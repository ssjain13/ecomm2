import {
  Box,
  Button,
  Flex,
  FormControl,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputComponent } from "../components/UI-components/InputField";

import { states } from "../data/state.json";
import { getOrderSummary } from "../redux/billing";

const formObj = {
  name: "",
  phoneNumber: "",
  address: "",
  pincode: "",
  locality: "",
  city: "",
  state: "",
};

export const CheckoutPage = ({ setAccordionProps }) => {
  const [formData, setFormData] = useState(formObj);
  const { cartItems } = useSelector((state) => state.cart);
  

  const [city, setCity] = useState(states[0].districts);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setAccordionProps((prev) => ({
      ...prev,
      isSummary: false,
      isBilling: false,
      accordionIndex: 1,
    }));
    dispatch(getOrderSummary(cartItems));
  };

  const handlStateChange = (e) => {
    const obj = states.find((s) => s.state === e.target.value);
    setCity(obj.districts);
    handleInputChange(e);
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  return (
    <>
      <Flex>
        <FormControl isRequired>
          <Flex>
            <InputComponent
              placeholder="Name"
              name="name"
              handleInputChange={handleInputChange}
            />
            <InputComponent
              placeholder="Phone number"
              name="phoneNumber"
              handleInputChange={handleInputChange}
            />
          </Flex>

          <Flex>
            <InputComponent
              placeholder="Pincode"
              name="pincode"
              handleInputChange={handleInputChange}
            />
            <InputComponent
              placeholder="Locality"
              name="locality"
              handleInputChange={handleInputChange}
            />
          </Flex>
          <Flex>
            <Box width="61%" mr="10px" mb="10px">
              <Textarea
                placeholder="Address"
                name="address"
                onChange={handleInputChange}
              ></Textarea>
            </Box>
          </Flex>

          <Flex>
            <Box width="30%" mr="10px">
              <Select name="state" onChange={handlStateChange} >
                {states &&
                  states.map((s) => <option value={s.state}>{s.state}</option>)}
              </Select>
            </Box>
            <Box width="30%">
              <Select name="city" onChange={handleInputChange}>
                {city && city.map((s) => <option value={s}>{s}</option>)}
              </Select>
            </Box>
          </Flex>

          <Flex>
            <Box mr="10px" mb="10px">
              <Button colorScheme="teal" type="submit" onClick={handleSubmit}>
                Next
              </Button>
            </Box>
          </Flex>
        </FormControl>
      </Flex>
    </>
  );
};
