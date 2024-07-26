import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import AuthService from "../../Services/AuthService";
import { useLocation } from "react-router-dom";
import { GlobalToast } from "../../Utils/GlobalToast";
import { ToastContainer } from "react-toastify";

const AddUserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = JSON.parse(location.state) || {};

  const [inputValues, setInputValues] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    address: "",
    gender: "",
    dob: "",
    username: "",
    password: "admin@1234",
  });
  const [isValid, setIsValid] = useState(false);

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    address: "",
    gender: "",
    dob: "",
    username: "",
  });

  /////validation///////
  const checkValidation = (name: any, value: any) => {
    //first Name validation
    switch (name) {
      case "fname":
        if (!value.length) {
          errors.fname = "First Name is required";
        } else {
          errors.fname = "";
        }

        break;
      case "lname":
        if (!value.length) {
          errors.lname = "Last Name is required";
        } else {
          errors.lname = "";
        }
        break;
      case "email":
        if (!value.length) {
          errors.email = "Email is required";
        } else {
          const emailPatterns: any =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          console.log(emailPatterns.test(value));

          if (!emailPatterns.test(value)) {
            errors.email = "Email is not valid";
          } else {
            errors.email = "";
          }
        }
        break;
      case "mobile":
        const patterns = /^\d+$/;
        if (!value.length) {
          errors.mobile = "Mobile number is required";
        } else if (!patterns.test(value)) {
          errors.mobile = "Input must be numbers only";
        } else if (value.length != 10) {
          errors.mobile = "Mobile number must be 10 digit";
        } else {
          errors.mobile = "";
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

      case "gender":
        if (!value.length) {
          errors.gender = "Gender is required";
        } else {
          errors.gender = "";
        }
        break;

      case "dob":
        if (!value.length) {
          errors.dob = "Dob is required";
        } else {
          errors.dob = "";
        }
        break;
      case "username":
        if (!value.length) {
          errors.username = "Username is required";
        } else if (value.length < 5) {
          errors.username = "Username be longer than 5 characters";
        } else if (value.length > 8) {
          errors.username = "Username be sorter than 12 characters";
        } else {
          errors.username = "";
        }
        break;
    }

    if (
      errors.fname == "" &&
      errors.lname == "" &&
      errors.email == "" &&
      errors.mobile == "" &&
      errors.address == "" &&
      errors.gender == "" &&
      errors.dob == "" &&
      errors.username == ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    [inputValues].forEach((el) => {
      if (
        el.fname == "" ||
        el.lname == "" ||
        el.email == "" ||
        el.mobile == "" ||
        el.address == "" ||
        el.gender == "" ||
        el.dob == "" ||
        el.username == ""
      ) {
        setIsValid(false);
      }
    });

    console.log(inputValues);
  };

  useEffect(() => {
    console.log(data);

    if (data.isEdit == true) {
      patchFormValue();
    }
  }, []);

  const patchFormValue = () => {
    setInputValues(data.obj);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "gender") {
      inputValues.gender = e.target.value;
    }
    setInputValues({ ...inputValues, [name]: value });

    checkValidation(name, value);
  };

  ////////////////////////////////For Add New User/////////////
  const addUser = async () => {
    try {
      const response: any = await AuthService.addUser(inputValues);
      if (response.data.statusCode == 200) {
        GlobalToast(response.data.message);

        navigate("/userlist");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  ////////////////////////////////For Update New User/////////////

  const updateUser = async () => {
    try {
      const response: any = await AuthService.updateUser(
        inputValues,
        data.obj._id
      );
      console.log(response);
      if (response.status == 200) {
        console.log(response.data.data.message);

        GlobalToast(response.data.message);
        setTimeout(() => {
          navigate("/userlist");
        }, 2002);
      } else {
        GlobalToast(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /////////////////////////////////For Action type Either Add or Edit////////
  const onAction = (actionType: boolean) => {
    if (actionType) {
      updateUser();
    } else {
      addUser();
    }
  };

  return (
    <>
      <Flex
        justify="center"
        align="center"
        bg="gray.50"
        w={"full"}
        h={"max-content"}
      >
        <Box
          p={10}
          maxW="4xl"
          borderWidth={3}
          borderRadius="xl"
          boxShadow="lg"
          bg="white"
        >
          <Heading mb={6} textAlign="center" color="teal.500">
            {data.isEdit ? "Update User" : "Add User"}
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={10}>
              <Flex width="100%">
                <FormControl
                  id="fname"
                  isInvalid={Boolean(errors.fname)}
                  mr={2}
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    onChange={(e) => handleChange(e)}
                    value={inputValues.fname}
                    name="fname"
                    type="text"
                    placeholder="First Name"
                  />

                  <FormErrorMessage>{errors.fname}</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="lname"
                  isInvalid={Boolean(errors.lname)}
                  ml={2}
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    onChange={(e) => handleChange(e)}
                    value={inputValues.lname}
                    name="lname"
                    type="text"
                    placeholder="Last Name"
                  />
                  <FormErrorMessage>{errors.lname}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(errors.username)}
                  id="username"
                  ml={2}
                >
                  <FormLabel>User Name</FormLabel>
                  <Input
                    onChange={(e) => handleChange(e)}
                    value={inputValues.username}
                    name="username"
                    type="text"
                    placeholder="Username"
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={Boolean(errors.mobile)}
                  id="number"
                  ml={2}
                >
                  <FormLabel>Mobile no</FormLabel>
                  <Input
                    onChange={(e) => handleChange(e)}
                    value={inputValues.mobile}
                    name="mobile"
                    type="tel"
                    placeholder="Enter your number"
                  />
                  <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex width="100%">
                <FormControl
                  isInvalid={Boolean(errors.email)}
                  id="email"
                  mr={2}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    onChange={(e) => handleChange(e)}
                    value={inputValues.email}
                    name="email"
                    type="email"
                    placeholder="Enter your email "
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(errors.address)}
                  id="Address"
                  ml={2}
                >
                  <FormLabel>Address</FormLabel>
                  <Input
                    onChange={(e) => handleChange(e)}
                    value={inputValues.address}
                    name="address"
                    type="text"
                    placeholder="Enter Address"
                  />
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.dob)} id="DOB" ml={2}>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    onChange={(e) => handleChange(e)}
                    value={inputValues.dob}
                    name="dob"
                    type="date"
                    placeholder=""
                  />
                  <FormErrorMessage>{errors.dob}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(errors.gender)}
                  id="Gender"
                  ml={2}
                >
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onChange={(e) => handleChange(e)}
                    value={inputValues.gender}
                    name="gender"
                    placeholder="Select option"
                  >
                    <option value="option1">Male</option>
                    <option value="option2">Female</option>
                  </Select>
                  <FormErrorMessage>{errors.gender}</FormErrorMessage>
                </FormControl>
              </Flex>
              <Button
                isDisabled={!isValid}
                onClick={() => onAction(data.isEdit)}
                mt={4}
                colorScheme="teal"
                type="submit"
                width="20%"
              >
                {data.isEdit ? "Update User" : "Add User"}
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default AddUserForm;
