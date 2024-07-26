import React, { useEffect, useState } from "react";

import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  FormErrorMessage,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../Services/AuthService";
import { GlobalToast } from "../../../Utils/GlobalToast";
import ProtectedRoute from '../../../Utils/Protected Route/ProtectedRoute';


function LoginForm() {
  const toast = useToast();
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);
  const [isLoad, setisLoad] = useState(false);


  const handleSubmit = (event: any) => {
    event.preventDefault();
      loginUser();
    // if (validate()) {
    // }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    checkValidation(name, value)
  };

 

  const checkValidation = (name:any, value:any) => {

   
    //first Name validation
    switch (name) {
      case 'email':

        if (!value.length) {
          errors.email = "Email is required";
        } else {
          const emailPatterns:any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          console.log(emailPatterns.test(value));
          
          if(!emailPatterns.test(value))
          {
            errors.email = "Email is not valid";
  
          }
          else{
            errors.email = "";
          }
        }
        break;
        case 'password':
          const condcheck = /^(?=.*[0-9]).{1,20}$/;
          if (!value.length) {
            errors.password = "Password is required";
          }   
          else if (value.length < 6) {
            errors.password = "Password must be longer than 6 characters";
            setIsValid(false)
          }
          else if (value.length >= 12) {
            errors.password = "Password must be sorter than 12 characters";
            setIsValid(false)
          }
          else if (!value.match(condcheck)) {
            errors.password = "Password must contain at least a number";
            setIsValid(false)

          }
          else {
            errors.password = "";
          }
          break;
    }
    console.log(errors);
    
   if(errors.email == "" && errors.password == "")
   {
    setIsValid(true)
   }
   else{
    setIsValid(false)
   }
   [inputValues].forEach(el => {
    console.log(el);
    
    if(el.email == "" || el.password == "")
    {
      setIsValid(false)

    }
  })
   

  }

  const newRegister = () => {
    navigate("/Signup");
  };

  const loginUser = async () => {
    setisLoad(true)
    try {
      const response: any = await AuthService.login(inputValues);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user-profile", JSON.stringify(response.data.data.user));
    setisLoad(false)

        navigate("/dashboard");
      } else {
    setisLoad(false)

        toast({
          title: response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
    setisLoad(false)

      GlobalToast("Something went wrong");
    }
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box maxW="md" width="100%" p={6} borderWidth={1} borderRadius="md" boxShadow="lg">
          <Heading mb={6} textAlign={"center"}>
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={Boolean(errors.email)} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  value={inputValues.email}
                  type="email"
                  name="email"
                />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={Boolean(errors.password)} isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  value={inputValues.password}
                  type="password"
                  name="password"
                />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Button isDisabled={!isValid || isLoad} colorScheme="teal" size={"md"} type="submit">
               
              {isLoad ? (<Spinner color='red.500' />) : 'Login'}
              </Button>
            </Stack>
            <Stack textColor="blue  ">
              <Text textAlign="center" margin={2} as="b" p={1}>
                Don't have login?{" "}
                <Text
                  onClick={() => newRegister()}
                  as="u"
                  style={{ cursor: "pointer" }}
                >
                  Register
                </Text>
              </Text>
            </Stack>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default LoginForm;
