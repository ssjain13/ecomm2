import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { data } from "../../model/product.json";
import { stock } from "../../model/stock.json";

import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router";
import { ProductForm } from "./ProductForm";

export const DisplayContainer = () => {
  const { title, category, price, rating } = data;
  const { productId, qty } = stock;
  const { products, loading, error, filteredData } = useSelector(
    (state) => state.product
  );
  const navigate = useNavigate();

  const updateProduct = (product) => {
    navigate("/product/edit", { state: product });
  };
  const dispatch = useDispatch();

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Rating</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr>
                <Td>{product.title}</Td>
                <Td>{product.category}</Td>
                <Td isNumeric>{product.price}</Td>
                <Td isNumeric>{product.rating.rate}</Td>
                <Td>
                  <Button
                    leftIcon={<CiEdit />}
                    variant="ghost"
                    onClick={() => updateProduct(product)}
                    mt="10px"
                    mr="10px"
                  ></Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
