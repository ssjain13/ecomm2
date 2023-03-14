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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { deleteCategory, fetchCategories, fetchProductsCount } from "../../api";

export const CategoryDashboard = ({ categories }) => {
  const dispatch = useDispatch();
  const { productCategoryMap, loading } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const updateCategory = (category) => {
    navigate("/category/edit", {
      state: { category: category },
    });
  };

  const onDelete = (category) => {
    //  getCountOfProductsByCategory(category);
    dispatch(deleteCategory(category.id));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const getCount = (category) => {
    const res = productCategoryMap.find((p) => p.category === category.name);

    return res && res.productCount;
  };
  const getCountOfProductsByCategory = (category) => {
    //API call which returns count of products in category provided.
    const m = { product: "", count: 0 };
    const final = [];
    dispatch(fetchProductsCount(category.name));
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
                  <Td>{getCount(category)}</Td>
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
