import React from 'react';
import { ChakraProvider, Box, Button, FormControl, FormLabel, Input, Stack, Heading, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const toast = useToast();
  const navigate = useNavigate();


  const handleSubmit = (event:any) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Add your signup logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    toast({
      title: "Signup attempt",
      description: `You attempted to signup with email: ${email}`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const signup =() =>{
    navigate("/");

  }

  return (
    <ChakraProvider>
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box maxW="lg" width="100%" p={6} borderWidth={1} borderRadius="md" boxShadow="lg">
          <Heading mb={6} textAlign={"center"}>Sign up</Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel> First name</FormLabel>
                <Input type="text" name="name" />
              </FormControl>
              <FormControl id="lastname" isRequired>
                <FormLabel> Last name</FormLabel>
                <Input type="text" name="name" />
              </FormControl>
              <FormControl id="username" isRequired>
                <FormLabel> Username</FormLabel>
                <Input type="text" name="name" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <Button type="submit" colorScheme="teal" width="full" size= "md" onClick={() => signup()} >Sign up</Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default SignupForm;
