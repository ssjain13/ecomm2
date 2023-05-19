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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../api";
import { MdOutlineVerified } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import "../../../styles/admin.style.css";
import { BackBtn } from "../../UI-components/BackBtn";

import { MoreUserAction } from "./MoreUserAction";
import { EmailIcon, LockIcon, NotAllowedIcon } from "@chakra-ui/icons";

export const UserDashboard = ({ currentUser }) => {
  const { userList, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <Box>
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
                <Td>{new Date(user.metadata.creationTime).toDateString()}</Td>
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
