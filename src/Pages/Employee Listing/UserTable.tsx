import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  TableContainer,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AuthService from "../../Services/AuthService";

// import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  mobile: string;
  age: number;
  address: string;
  gender: string;
  dob: string;
  username: string;
  isadmin: string
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const toast = useToast();

  const handleEdit = (user: User) => {
    onEdit(user);
    toast({
      title: "Edit option selected",
      description: `You are editing user: ${user.fname} ${user.lname}`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = (user: User) => {
    onDelete(user);
  };

  console.log(users);
  

  return (
    <Box  ml={12} maxW="6xl" mx="auto" w={"full"} >
      <Text
        fontSize="4xl"
        mb={4}
        fontWeight="bold"
        textAlign="center"
        color="teal"
      >
        User Listing Table
      </Text>
      <TableContainer
        border="2px black"
        borderColor="gray.200"
        borderRadius="md"
        overflow="hidden"
        className="rounded-md "
      >
        <Table variant="simple" colorScheme="black" >
          <Thead bg="teal">
            <Tr>
              <Th color="white">First Name</Th>
              <Th color="white">Last Name</Th>
              <Th color="white">Email</Th>
              <Th color="white">Mobile no</Th>
              <Th color="white">DOB</Th>
              <Th color="white">Address</Th>
              <Th color="white">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.fname}</Td>
                <Td>{user.lname}</Td>
                <Td>{user.email}</Td>
                <Td>{user.mobile}</Td>
                <Td>{user.dob}</Td>
                <Td>{user.address}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      icon={<FaEdit />}
                      onClick={() => handleEdit(user)}
                      colorScheme="teal"
                      isRound
                      variant="ghost"
                      size={"10px"}
                      aria-label="Edit user"
                    />
                    <IconButton
                      icon={<MdDelete />}
                      onClick={() => handleDelete(user)}
                      colorScheme="red"
                      isRound
                      variant="ghost"
                      aria-label="Delete user"
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
