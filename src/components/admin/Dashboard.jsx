import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Td,
  TableContainer,
  Button,
  Box,
} from "@chakra-ui/react";

import "../../styles/admin.style.css";

import { useDispatch, useSelector } from "react-redux";
import { data } from "../../model/product.json";
import { stock } from "../../model/stock.json";

import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router";
import { ProductForm } from "./ProductForm";

export const Dashboard = ({ categories }) => {
  console.log(categories);
  const { title, category, price, rating } = data;
  const { productId, qty } = stock;
  const { products, loading, error, filteredData } = useSelector(
    (state) => state.product
  );

  const navigate = useNavigate();

  const updateProduct = (product) => {
    navigate("/product/edit", {
      state: { product: product, categories: categories },
    });
  };
  const dispatch = useDispatch();

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Tr className="table-heading">
            <Td>Title</Td>
            <Td>Category</Td>
            <Td isNumeric>Price</Td>
            <Td isNumeric>Rating</Td>
            <Td></Td>
          </Tr>

          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
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
