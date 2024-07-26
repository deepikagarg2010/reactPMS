import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Image,
  Text,
  HStack,
  Avatar,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  IconButton,
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";
import { MdDelete, MdSupervisedUserCircle } from "react-icons/md";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(
    JSON.parse(localStorage.getItem("user-profile")!) || {}
  );

  const [userName, setUserName] = useState("");

  useEffect(() => {
    let firstName: any = userProfile.fname;
    let lastName: any = userProfile.lname;
    let fullName = firstName + " " + lastName;
    setUserName(fullName);
  }, userProfile);

  const handleLogut = () => {
    console.log("logout");

    localStorage.clear();
    sessionStorage.clear();
    navigate("");
  };
  return (
    <Flex w={"full"} px={3} bg={"teal"} position={"sticky"} top={0} minH="10">
      <Flex
        w={"full"}
        h={16}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo on the left side */}
        <Box>
          <Heading textColor={"white"}>PMS</Heading>
        </Box>

        {/* Profile icon with name on the right side */}
        <HStack spacing={4}>
          {/* <Text textColor={"white"}>Profile</Text> */}
          <Menu>
            <MenuButton>
              <Avatar name={userName} cursor={"pointer"} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <IconButton
                  icon={<MdSupervisedUserCircle />}
                  colorScheme="teal"
                  isRound
                  variant="ghost"
                  aria-label="Delete obj"
                />
                My Profile
              </MenuItem>
              <MenuItem onClick={() => handleLogut()}>
                <IconButton
                  icon={<MdDelete />}
                  isRound
                  variant="ghost"
                  aria-label="Delete obj"
                />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Header;
