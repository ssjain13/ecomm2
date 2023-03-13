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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";

const cat_product = {
    category : "", 
    count : 0
}
export const CategoryDashboard = ({ categories }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
const navigate = useNavigate();
  const updateCategory = (category) => {
    console.log("In update ");
  };

  const onDelete = () => {
    console.log("In delete ");
  };

  const getCountOfProductsByCategory = (category) => {
    

  };

  return (
    <Box>
      {categories.length < 1 ? (
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
          No Categories!!
        </Heading>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr className="table-heading">
                <Td>Name</Td>
                <Td>Description</Td>

                <Td isNumeric>No. of Products</Td>
                <Td></Td>
              </Tr>
            </Thead>

            <Tbody>
              {categories.map((category) => (
                <Tr key={category.name}>
                  <Td>{category.name}</Td>
                  <Td>{category.description}</Td>

                  <Td>
                    <Button
                      leftIcon={<CiEdit />}
                      variant="ghost"
                      onClick={() => updateCategory(category)}
                      mt="10px"
                      mr="10px"
                    ></Button>
                    <Button
                      leftIcon={<RxCross2 />}
                      variant="ghost"
                      onClick={() => onDelete(category)}
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
