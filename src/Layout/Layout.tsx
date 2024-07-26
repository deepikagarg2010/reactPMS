import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Component/Sidebar/Sidebar'
import Header from '../Component/Header/header'
import { Outlet } from 'react-router-dom'
import { px } from 'framer-motion'

type Props = {}

const Layout = (props: Props) => {
  const [user, setUser] = useState(localStorage.getItem('token'))

  useEffect(()=>{
    console.log(user);
    setUser(user)
    
  },[user])
  return (
    
    <Flex w={"full"} h={"100dvh"} overflow={"auto"}>
    <Flex direction={"column"} w={"full"} >
      <Header/>
      <Flex w={"full"} h={"full"} >
       <Sidebar/>
       <Flex w={"full"} overflowY={"auto"} p={5}  h={"full"}>
        <Outlet context={{user, setUser}}/>
       </Flex>
      </Flex>
    </Flex>
      
    </Flex>
    
  )
}

export default Layout