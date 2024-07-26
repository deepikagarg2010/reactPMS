// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Stack, Icon } from '@chakra-ui/react';
import { FaBeer, FaCoffee, FaApple, FaAmazon, FaGoogle, FaMicrosoft, FaUser } from 'react-icons/fa';
import ProjectService from '../../Services/ProjectService';

const cards = [
  { icon: FaUser, title: 'Card 1', text: 'Total Projects.', bg: 'teal.100' },
  { icon: FaUser, title: 'Card 2', text: 'No of Active Employees', bg: 'orange.100' },
  { icon: FaUser, title: 'Card 3', text: 'No. of Assigned projects', bg: 'red.100' },
  { icon: FaUser, title: 'Card 4', text: 'Unassigned Projects', bg: 'yellow.100' },
  { icon: FaUser, title: 'Card 5', text: '', bg: 'green.100' },
  { icon: FaUser, title: 'Card 6', text: 'Use Microsoft products.', bg: 'blue.100' },
];

const Dashboard = () => {

  const [widgets, setWidgets] = useState(cards)

  const [totalProject, setTotalProject] = useState(0)

  const [projects, setProjects] = useState(
    [
            
    ]
      )

      useEffect(() => {
        getProjects()
      }, widgets)

  const getProjects = async ()=>{
    try{
      const response : any = await ProjectService.getProjects()
      console.log(response);
      
      if(response.status==200){
        console.log(response.data);
    
        setTotalProject(response.data.data.length)
        console.log(widgets);
        
        widgets[0].text =  widgets[0].text + "" +totalProject
        setWidgets(widgets)
    
      }else{
    
      }
    } catch(err){
              console.log(err);
              
            }
      }


  return (
    <Box p={4}>
      <Flex wrap="wrap" justify="space-between">
        {widgets.map((card, index) => (
          <Box
            key={index}
            flex="1 1 30%"
            m={2}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg={card.bg}
            boxShadow="lg"
            _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
          >
            <Box p="8">
              <Stack spacing={8} align="center">
                <Icon as={card.icon} boxSize={10} />
                <Text fontSize="xl" fontWeight="bold">
                  {card.title}
                </Text>
                <Text textAlign="center" fontWeight={"bold"} fontSize="lg">
                  {card.text}
                </Text>
              </Stack>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Dashboard;
