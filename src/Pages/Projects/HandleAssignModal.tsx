import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  VStack,
  Flex,
  useColorMode,
  Stack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import ProjectService from "../../Services/ProjectService";
import AuthService from "../../Services/AuthService";

export interface assiginPopup {
    senData : (value: any) => void;
    cancelClose : (value: any) => void;

}
const HandleAssignModal = (props:assiginPopup) => {
const {senData, cancelClose}=props
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [inputValues, setInputValues] = useState({
    projectid: "",
    userid: "",
    duration: "",
    status: "assigned",
    assigndate: new Date(),
  });

  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([]);

  const handleAssign = () => {
    // Implement assign logic here
  };

  const handleCancel = () => {
    // Implement cancel logic here
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const onCloseModel = () => {
    cancelClose(false)
  }

  const assignProject = () => {
    senData(inputValues)
  }

  useEffect(()=>{
    
    getProjects()
    getUser()
  },[])



  // call APIs for project Dropdown
    const getProjects = async ()=>{
try{
  const response : any = await ProjectService.getProjects()
  console.log(response);
  
  if(response.status==200){
    console.log(response.data);

    setProjects(response.data.data)

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
       <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem colSpan={1}>
                  <FormControl id="ProjectName" isRequired>
                    <FormLabel>Project Name</FormLabel>
                    <Select name="projectid" onChange={(e) => handleChange(e)}
                  value={inputValues.projectid} placeholder="Select option">
                      {projects.map((res:any) =>
                      <option key={res._id} value={res._id}>{res.projectname}</option>
                    
                    )}
                    </Select>
                  </FormControl>
                </GridItem>  
                <GridItem colSpan={1}>
                  <FormControl id="client" isRequired>
                    <FormLabel>Assign To</FormLabel>
                    <Select name="userid" onChange={(e) => handleChange(e)}
                  value={inputValues.userid} placeholder="Select option">
                      {users.map((res:any) =>
                      <option key={res._id} value={res._id}>{res.fname + " " + res.lname}</option>
                    
                    )}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl id="duration" isRequired>
                    <FormLabel>Duration</FormLabel>
                    <Input  onChange={(e) => handleChange(e)}
                  value={inputValues.duration} 
                      name="duration"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              <Grid templateColumns="repeat(3, 1fr)" gap={1}>
              <GridItem colSpan={2}>
           
    </GridItem>
    <GridItem colSpan={1}>
    <Button onClick={assignProject} colorScheme="teal" mr={3} type="submit">
              Assign
              </Button>
    <Button onClick={onCloseModel}>Cancel</Button>
    </GridItem>
              </Grid>
        
            </Stack>
          </form>
    </>
  );
};

export default HandleAssignModal;
