import React, { useEffect, useState } from "react";
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
  FormErrorMessage,
} from "@chakra-ui/react";

import { FaEdit, FaTasks } from "react-icons/fa";
import ProjectService from "../../Services/ProjectService";
import { GlobalToast } from "../../Utils/GlobalToast";
import { MdCancel, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import HandleAssignModal from "./HandleAssignModal";

function Projects() {
  const navigate = useNavigate();
  const initialValue = {
    projectname: "",
    shortdescr: "",
    descr: "",
    client: "",
    phone: "",
    address: "",
    status: "",
  };
  const [isValid, setIsValid] = useState(false);

  const [errors, setErrors] = useState({
    projectname: "",
    shortdescr: "",
    descr: "",
    client: "",
    phone: "",
    address: "",
    status: "",
  });

  ////validation////
  const checkValidation = (name: any, value: any) => {
    //first Name validation
    switch (name) {
      case "projectname":
        if (!value.length) {
          errors.projectname = " This is required";
        } else {
          errors.projectname = "";
        }

        break;
      case "shortdescr":
        if (!value.length) {
          errors.shortdescr = "This field is required";
        } else {
          errors.shortdescr = "";
        }
        break;
      case "descr":
        if (!value.length) {
          errors.descr = "Desciption is required";
        } else {
          errors.descr = "";
        }
        break;
      case "phone":
        const patterns = /^\d+$/;
        if (!value.length) {
          errors.phone = "Mobile number is required";
        } else if (!patterns.test(value)) {
          errors.phone = "Input must be numbers only";
        } else if (value.length != 10) {
          errors.phone = "Mobile number must be 10 digit";
        } else {
          errors.phone = "";
        }
        break;

      case "address":
        if (!value.length) {
          errors.address = "Address is required";
        } else if (value.length < 5) {
          errors.address = "Address must be longer than 5 characters";
        } else {
          errors.address = "";
        }
        break;

      case "client":
        if (!value.length) {
          errors.client = "Client is required";
        } else {
          errors.client = "";
        }
        break;

      case "status":
        if (!value.length) {
          errors.status = "Status is required";
        } else {
          errors.status = "";
        }
        break;
    }

    if (
      errors.projectname == "" &&
      errors.shortdescr == "" &&
      errors.descr == "" &&
      errors.client == "" &&
      errors.address == "" &&
      errors.phone == "" &&
      errors.status == ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    [inputValues].forEach((el) => {
      if (
        el.projectname == "" ||
        el.shortdescr == "" ||
        el.descr == "" ||
        el.client == "" ||
        el.address == "" ||
        el.phone == "" ||
        el.status == ""
      ) {
        setIsValid(false);
      }
    });

    console.log(inputValues);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modal2 = useDisclosure();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [id, setId] = useState("");

  const [inputValues, setInputValues] = useState(initialValue);

  const [projects, setProjects] = useState([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    checkValidation(name, value);
  };

  const handleEdit = async (obj: any) => {
    ////Binfd Api For Edit
    console.log(obj, "obj");
    onOpen();
    setInputValues(obj);
    setIsEditOpen(true);
    setId(obj._id);
  };

  ////getallprojects///////////
  const getProjects = async () => {
    try {
      const response: any = await ProjectService.getProjects();
      console.log(response);

      if (response.status == 200) {
        console.log(response.data);

        setProjects(response.data.data);
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);

  const openPopUp = () => {
    setInputValues(initialValue);
    onOpen();
  };

  const onCloseModel = (): void => {
    onClose();
    setIsEditOpen(false);
    setInputValues(initialValue);
    modal2.onClose();
  };

  const handleDelete = async (obj: any) => {
    ////Binfd Api For Delete
    try {
      const response: any = await ProjectService.DeleteProject(obj._id);
      console.log(response);
      if (response.status == 200) {
        GlobalToast(response.data.message);
        getProjects();
      } else {
        GlobalToast(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleAssign = (obj: any) => {
    modal2.onOpen();
  };

  const sendSelectedData = async (data: any) => {
    console.log(data);
    modal2.onClose();

    try {
      const response: any = await ProjectService.assignProjectToUser(data);
      console.log(response);

      if (response.data.status == 200) {
        GlobalToast(response.data.message);
      } else {
        GlobalToast(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unassignTask = (obj: any) => {};

  /////// CreateProjectApi//////
  const onSubmit = async (isEditOpen: boolean) => {
    if (!isEditOpen) {
      try {
        const response: any = await ProjectService.CreateProject(inputValues);
        if (response.data.statusCode == 200) {
          getProjects();

          GlobalToast(response.data.message);
          onCloseModel();
        } else {
          getProjects();
          getProjects();
          GlobalToast(response.data.message);
          onCloseModel();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response: any = await ProjectService.UpdateProject(
          inputValues,
          id
        );
        console.log(response, "response");

        if (response.status == 200) {
          GlobalToast(response.data.message);
          getProjects();
          onCloseModel();
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <ChakraProvider>
        <Button onClick={openPopUp} colorScheme="teal" mb={4}>
          Create Project
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {isEditOpen ? "Update Project" : "Create Project"}
            </ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Stack spacing={4}>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    <GridItem colSpan={1}>
                      <FormControl
                        id="ProjectName"
                        isInvalid={Boolean(errors.projectname)}
                        isRequired
                      >
                        <FormLabel>Project Name</FormLabel>
                        <Input
                          onChange={(e) => handleChange(e)}
                          value={inputValues.projectname}
                          name="projectname"
                        />
                        <FormErrorMessage>
                          {errors.projectname}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl
                        id="client"
                        isInvalid={Boolean(errors.client)}
                        isRequired
                      >
                        <FormLabel>Client Name</FormLabel>
                        <Input
                          onChange={(e) => handleChange(e)}
                          value={inputValues.client}
                          name="client"
                        />
                        <FormErrorMessage>{errors.client}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl
                        id="phone"
                        isInvalid={Boolean(errors.phone)}
                        isRequired
                      >
                        <FormLabel>Phone</FormLabel>
                        <Input
                          onChange={(e) => handleChange(e)}
                          value={inputValues.phone}
                          name="phone"
                        />
                        <FormErrorMessage>{errors.phone}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    <GridItem colSpan={1}>
                      <FormControl
                        id="address"
                        isInvalid={Boolean(errors.address)}
                        isRequired
                      >
                        <FormLabel>Address</FormLabel>
                        <Input
                          onChange={(e) => handleChange(e)}
                          value={inputValues.address}
                          name="address"
                        />
                        <FormErrorMessage>{errors.address}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl
                        id="status"
                        isInvalid={Boolean(errors.status)}
                        isRequired
                      >
                        <FormLabel>Status</FormLabel>
                        <Select
                          onChange={(e) => handleChange(e)}
                          value={inputValues.status}
                          name="status"
                          placeholder="Select option"
                        >
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </Select>
                        <FormErrorMessage>{errors.status}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl
                        id="shortdescr"
                        isInvalid={Boolean(errors.shortdescr)}
                        isRequired
                      >
                        <FormLabel>Short Description</FormLabel>
                        <Input
                          onChange={(e) => handleChange(e)}
                          value={inputValues.shortdescr}
                          name="shortdescr"
                        />
                        <FormErrorMessage>{errors.shortdescr}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    <GridItem colSpan={3}>
                      <FormControl
                        id="descr"
                        isInvalid={Boolean(errors.descr)}
                        isRequired
                      >
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          onChange={(e) => handleChange(e)}
                          value={inputValues.descr}
                          name="descr"
                        />
                        <FormErrorMessage>{errors.descr}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={!isValid}
                  onClick={() => onSubmit(isEditOpen)}
                  colorScheme="teal"
                  mr={3}
                  type="submit"
                >
                  {isEditOpen ? "Update" : "Save"}
                </Button>
                <Button onClick={onCloseModel}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </ChakraProvider>

      {/* /////////////////////////////Table/ */}
      <Box ml={12} maxW="6xl" mx="auto" w={"full"}>
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
          justifyContent={"center"}
        >
          <Table variant="simple" colorScheme="black" justifyContent={"center"}>
            <Thead bg="teal">
              <Tr>
                <Th color="white">Project Name</Th>
                <Th color="white">Client Name</Th>
                <Th color="white">Mobile no</Th>
                <Th color="white">Address</Th>
                <Th color="white">Short Description</Th>
                <Th color="white">Status</Th>
                <Th color="white">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((obj: any) => (
                <Tr key={obj._id}>
                  <Td>{obj.projectname}</Td>
                  <Td>{obj.client}</Td>
                  <Td>{obj.phone}</Td>
                  <Td>{obj.address}</Td>
                  <Td>{obj.shortdescr}</Td>
                  <Td>{obj.status}</Td>

                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<FaEdit />}
                        onClick={() => handleEdit(obj)}
                        colorScheme="teal"
                        isRound
                        variant="ghost"
                        size={"10px"}
                        aria-label="Edit obj"
                      />
                      <IconButton
                        icon={<FaTasks />}
                        onClick={() => handleAssign(obj)}
                        colorScheme="teal"
                        isRound
                        variant="ghost"
                        aria-label="Task Assign"
                      />

                      {/* <IconButton
                      icon={<MdCancel />
                      }
                      onClick={() => unassignTask(obj)}
                      colorScheme="red"
                      isRound
                      variant="ghost"
                      aria-label="Delete obj"
                      
                    /> */}
                      <IconButton
                        icon={<MdDelete />}
                        onClick={() => handleDelete(obj)}
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

      {/* /////////////////////////Assign projrct Popup */}
      <ChakraProvider>
        <Modal isOpen={modal2.isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Assign Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HandleAssignModal
                senData={sendSelectedData}
                cancelClose={onCloseModel}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  );
}

export default Projects;
