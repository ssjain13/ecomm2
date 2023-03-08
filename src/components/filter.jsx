import { Button, Flex, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiFilter } from "react-icons/bi";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { filterProducts } from "../redux/product";
export const Filters = ({ categories }) => {
  
  const dispatch = useDispatch();

  const onFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    dispatch(filterProducts(e.target.value));
  };

  const [selectedFilter, setSelectedFilter] = useState();

  const options = categories.map((category) => {
    return (
      <option value={category.name} key={category.id}>
        {category.name}
      </option>
    );
  });
  return (
    <Flex justifyContent={"flex-end"}>
      <Button leftIcon={<HiSortAscending />} ml="10px" mr="10px" />
      <Button leftIcon={<HiSortDescending />} ml="10px" mr="10px" />

      <Select
        width="300px"
        icon={<BiFilter />}
        mr="10px"
        variant="filled"
        onChange={onFilterChange}
        value={selectedFilter}
      >
        <option value='ALL'>ALL</option>
        {options}
      </Select>
    </Flex>
  );
};
