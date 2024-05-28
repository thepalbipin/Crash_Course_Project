// import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, Flex, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';

const links = [
  {
    to: "/", label: "HOME",
  },
  {
    to: "/login", label: "LOGIN",
  },
  {
    to: "/about", label: "ABOUT",
  },
  {
    to: "/contact", label: "CONTACT",
  },
  {
    to: "/tasks", label: "TASKS",
  },
];

export default function Navbar(){

  const {logout} = useContext(AuthContext);

  return(
    <Flex 
      align="center" 
      justify="space-around" 
      fontWeight="semibold" 
      bg="gray.200" 
      padding="4">
      {
        links?.map((link)=>(
          <ChakraLink 
            as={ReactRouterLink} 
            color="red.600"
            key={link.to} 
            to={link.to}>
              {link.label}
          </ChakraLink>
        ))  
      }

      <Button
      colorScheme='red' 
      variant='solid'
      onClick={logout}>LOGOUT</Button>
    </Flex>
  );
}