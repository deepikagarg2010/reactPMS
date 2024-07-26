import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Grid,
  GridItem,
  Box,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
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
  SimpleGrid,
} from '@chakra-ui/react';
import ProjectService from '../../Services/ProjectService';
import { MdCancel } from 'react-icons/md';
import AuthService from '../../Services/AuthService';
const Myproject =() => {
  const [assignedProject, setAssignedProject] = useState([])


  useEffect(()=>{
    let obj = JSON.parse(localStorage.getItem('user-profile')!) || {}
    getAssignedProjectById(obj.id)
  },[])
  ////////////getAssignedProjectById

  const getAssignedProjectById = async (userId:any)=>{
    
    try{
      const response : any = await ProjectService.getAssignedProjectById(userId)
      console.log(response);
      
      if(response.status==200){
        console.log(response.data);
    
        setAssignedProject(response.data.data)
    
      }else{
        setAssignedProject([])
      }
    } catch(err){
      setAssignedProject([])

              
            }
      }

  

  return (
    <>
      <SimpleGrid columns={1} spacing={10}>
      <Box  ml={12} maxW="6xl" mx="auto" w={"full"} mt ="30px" >
  <Text
    fontSize="4xl"
    mb={4}
    fontWeight="bold"
    textAlign="center"
    color="teal"
    ms={40}
  >
    Assigned Project
  </Text>
  <TableContainer
  ms={"40"}
    border="2px black"
    borderColor="gray.200"
  borderRadius="md"
    overflow="hidden"
    className="rounded-md "
  >
    <Table variant="simple" colorScheme="black" >
      <Thead bg="teal">
        <Tr>
        <Th color="white">User ID</Th>

          <Th color="white">Project Name</Th>
          <Th color="white">Client Name</Th>
          <Th color="white">Address</Th>
          <Th color="white">Assigned Date</Th>
          <Th color="white">Duration</Th>
          <Th color="white">Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {assignedProject.map((obj:any) => (
          <Tr key={obj._id}>
            <Td>{obj.userid}</Td>
            <Td>{obj.projectid.projectname}</Td>
            <Td>{obj.projectid.client}</Td>
            <Td>{obj.projectid.address}</Td>
            <Td>{obj.assigndate}</Td>
            <Td>{obj.duration}</Td>
            <Td>{obj.status}</Td>
            <Td>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
</Box>
</SimpleGrid>


    </>



  )
}
 export default Myproject