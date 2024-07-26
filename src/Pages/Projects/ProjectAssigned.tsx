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
import { GlobalToast } from '../../Utils/GlobalToast';
const initilVal = {
  userid: ""
}
const ProjectAssigned =() => {
  const [assignedProject, setAssignedProject] = useState([])
  const [users, setUsers] = useState([]);
  const [inputValues, setInputValues] = useState(initilVal);
  const handleChange = (value: any) => {
    setInputValues(value)
    getAssignedProjectById(value)
  };


  useEffect(()=>{
    getUser()
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
        console.log(response.data);
        
      GlobalToast(response.data.message)

      }
    } catch(err:any){
      GlobalToast(err.response.data.message)

      setAssignedProject([])

              
            }
      }

      /////////////////////////////Un-Assign-Project-From-user
      const unassignTask = async (obj:any) => {
        let payLoad = {
          "projectid":obj.projectid,
          "userid": obj.userid
        }
        try{
          const response : any = await ProjectService.unassignProjectToUser(payLoad)
          console.log(response);
          
          if(response.status==200){
            console.log(response.data);
            GlobalToast(response.data.message)
            setInputValues(initilVal)
            setAssignedProject([])
        
          }else{
        
          }
        } catch(err){
                  console.log(err);
                  
                }
      }
        //////////get User Ls
  const getUser = async ()=>{ 
    try {
      const response: any = await AuthService.getUser();
      if (response.status == 200) {

      setUsers(response.data.data)

      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
      
    }
  
  }
  return (
    <>
<SimpleGrid columns={1} spacing={10} justifyContent={"end"}>
<FormControl id="client" isRequired>
                    <FormLabel>Assign To</FormLabel>
                    <Select name="userid" onChange={(e) => handleChange(e.target.value)}
                  value={inputValues.userid} placeholder="Select option">
                      {users.map((res:any) =>
                      <option key={res._id} value={res._id}>{res.fname + " " + res.lname}</option>
                    
                    )}
                    </Select>
                  </FormControl>

                  
</SimpleGrid>
      <SimpleGrid columns={1} spacing={10}>
      <Box  ml={12} maxW="6xl" mx="auto" w={"full"} mt ="30px" >
  <Text
    fontSize="4xl"
    mb={4}
    fontWeight="bold"
    textAlign="center"
    color="teal"
  >
    Assigned Project
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
        <Th color="white">User ID</Th>

          <Th color="white">Project Name</Th>
          {/* <Th color="white">Client Name</Th> */}
          <Th color="white">Address</Th>
          <Th color="white">Assigned Date</Th>
          <Th color="white">Duration</Th>
          <Th color="white">Status</Th>
          <Th color="white">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {assignedProject.map((obj:any) => (
          <Tr key={obj._id}>
            <Td>{obj.userid}</Td>
            <Td>{obj.projectid?.projectname}</Td>
            <Td>{obj.projectid?.address}</Td>
            <Td>{obj.assigndate}</Td>
            <Td>{obj.duration}</Td>
            <Td>{obj.status}</Td>
            <Td>
         
            <HStack spacing={2}>
                  <IconButton
                  icon={<MdCancel />
                  }
                  onClick={() => unassignTask(obj)}
                  colorScheme="red"
                  isRound
                  variant="ghost"
                  aria-label="Delete obj"
                  
                />
      
           
                
              </HStack>
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
 export default ProjectAssigned