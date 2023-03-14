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
  Heading,
  Text,
} from "@chakra-ui/react";

import "../../styles/admin.style.css";

import { useDispatch, useSelector } from "react-redux";
import { data } from "../../model/product.json";
import { stock } from "../../model/stock.json";

import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { ProductForm } from "./ProductForm";
import {
  deleteProduct,
  fetchCategories,
  fetchProducts,
  fetchProductsCount,
} from "../../api";

export const Dashboard = ({ categories }) => {
  const { title, category, price, rating } = data;
  const { productId, qty } = stock;
  const { products, loading, error, filteredData } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);
  const navigate = useNavigate();

  const updateProduct = (product) => {
    navigate("/product/edit", {
      state: { product: product, categories: categories },
    });
  };

  const onDelete = (product) => {
    dispatch(deleteProduct(product.id));
  };
  return (
    <Box>
      {products.length < 1 ? (
        <Heading
          className="product_msg0"
          style={{
            paddingTop: "10px",
            fontFamily: "'Copse', serif",
            fontWeight: "100",
            textAlign: "center",
            fontSize: "1.5em",
          }}
        >
          No Products!!
        </Heading>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr className="table-heading">
                <Td>Title</Td>
                <Td>Category</Td>
                <Td isNumeric>Price</Td>
                <Td isNumeric>Rating</Td>
                <Td></Td>
              </Tr>
            </Thead>

            <Tbody>
              {products.map((product) => (
                <Tr key={product.name}>
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
                    <Button
                      leftIcon={<RxCross2 />}
                      variant="ghost"
                      onClick={() => onDelete(product)}
                      mt="10px"
                      mr="10px"
                    ></Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Button onClick={() => navigate("/admin")}>Back</Button>
    </Box>
  );
};
