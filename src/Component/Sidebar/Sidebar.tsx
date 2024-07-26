import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Flex, IconButton, VStack, Text, HStack, Spacer, Heading, Avatar } from '@chakra-ui/react';
import { FaHome, FaUser, FaEnvelope, FaCog, FaBell, FaSignOutAlt, FaProjectDiagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const menus:any = [
  {
    isAdmin : true,
    menuData : [
      {
        id:1,
        name : "Dashboard",
        redirectUrl:"/dashboard",
        iconname:<FaHome />
      },
      {
        id:2,
        name : "Employee",
        redirectUrl:"/employess",
        iconname:<FaUser />
      },
      {
        id:3,
        name : "Employee Listing",
        redirectUrl:"/userlist",
        iconname:<FaUser />
      },
      {
        id:4,
        name : "Projects",
        redirectUrl:"/projects",
        iconname:<FaProjectDiagram />
      },
      {
        id:5,
        name : "Assigned Projects",
        redirectUrl:"/assignedProject",
        iconname:<FaBell />
      }
      
    ]
  },
  {
    isAdmin : false,
    menuData : [
      {
        id:1,
        name : "Dashboard",
        redirectUrl:"/dashboard",
        iconname:<FaHome />
      },
      {
        id:4,
        name : "My Projects",
        redirectUrl:"/myprojects",
        iconname:<FaProjectDiagram />
      }
      
    ]
  }
]
function Sidebar() {

const [userProfile , setUserProfile]= useState(
  JSON.parse(localStorage.getItem("user-profile")!) || {}
)

const [allMenus, setAllMenus] = useState([])
console.log(userProfile, "user-profile");

useEffect(() => {
  getRolewiseMenu()
},allMenus)

const getRolewiseMenu=() => {
const filterMenus = menus.filter((el:any) => el.isAdmin == userProfile.isadmin)
console.log(filterMenus);

setAllMenus(filterMenus[0]?.menuData)
console.log(allMenus);

}

  return (
    <ChakraProvider>
      <Flex  h={"full"}>    
        <Box
          w="225px"
          bg="teal"
          color="white"
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={4}
        >
          <VStack spacing={4} mt={4} w="full">

            {allMenus.map((el:any) =>
            <>
                        <HStack w="full">
              <IconButton
                aria-label="Dashboard"
                cursor={"pointer"}
                icon={el.iconname}
                isRound
                variant="ghost"
                colorScheme="white"
                _hover={{ bg: "" }}
              />
             <Link key={el.id} to={el.redirectUrl}> <Text cursor={"pointer"} fontWeight="bold"fontSize="18px" >
              {el.name}
              </Text></Link>
            </HStack>
            </>
            )}
            <Spacer />
           
          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );

  

}

export default Sidebar;
