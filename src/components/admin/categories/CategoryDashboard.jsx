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
  Spinner,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { BiArrowBack } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { deleteCategory, fetchCategories } from "../../../api";
import { BackBtn } from "../../UI-components/BackBtn";

export const CategoryDashboard = ({ categories }) => {
  const dispatch = useDispatch();
  const { productCategoryMap, loading, error } = useSelector(
    (state) => state.product
  );
  const navigate = useNavigate();
  const updateCategory = (category) => {
    navigate("/category/edit", {
      state: { category: category },
    });
  };

  const onDelete = (category) => {
    dispatch(deleteCategory(category));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const getCount = (category) => {
    const value = productCategoryMap[category];
    return value ? value : 0;
  };

  return (
    <Box>
      {loading && <Progress size="xs" isIndeterminate mt={"30px"} />}
      {!loading && categories.length < 1 ? (
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
        !loading && (
          <>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr className="table-heading">
                    <Td></Td>
                    <Td>Name</Td>
                    <Td width="30px">Description</Td>

                    <Td isNumeric>No. of Products</Td>
                  </Tr>
                </Thead>

                <Tbody>
                  {categories.map((category) => (
                    <Tr key={category.id}>
                      <Td>
                        <Button
                          leftIcon={<CiEdit />}
                          variant="ghost"
                          onClick={() => updateCategory(category)}
                          mt="10px"
                        ></Button>
                        <Button
                          leftIcon={<RxCross2 />}
                          variant="ghost"
                          onClick={() => onDelete(category)}
                          mt="10px"
                        ></Button>
                      </Td>
                      <Td>{category.name}</Td>
                      <Td>{category.description}</Td>
                      <Td>{getCount(category.name)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <BackBtn />
          </>
        )
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Box>
  );
};
