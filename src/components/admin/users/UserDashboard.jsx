import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Progress,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../api";
import { MdOutlineVerified } from "react-icons/md";
import "../../../styles/admin.style.css";
import { BackBtn } from "../../UI-components/BackBtn";

import { MoreUserAction } from "./MoreUserAction";
import { LockIcon, NotAllowedIcon } from "@chakra-ui/icons";

export const UserDashboard = ({ currentUser }) => {
  const { userList, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <Box>
      {loading && <Progress size="xs" isIndeterminate mt={"30px"} />}
      {!loading && userList.length < 1 ? (
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
          No Users!!
        </Heading>
      ) : (
        !loading && (
          <>
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
              User Information
            </Heading>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr className="table-heading">
                    <Td>Name</Td>
                    <Td>Email</Td>
                    <Td>Created Date</Td>
                    <Td>Email verified</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {userList.map((user) => (
                    <Tr key={user.uid}>
                      <Td>{user.displayName}</Td>
                      <Td>
                        {user.email}
                        {user.disabled && <LockIcon />}
                      </Td>
                      <Td>
                        {new Date(user.metadata.creationTime).toDateString()}
                      </Td>
                      <Td>
                        {user.emailVerified ? (
                          <MdOutlineVerified />
                        ) : (
                          <NotAllowedIcon />
                        )}
                      </Td>
                      <Td>
                        <MoreUserAction user={user} />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )
      )}
      <BackBtn />
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
