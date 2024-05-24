// import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, Flex } from '@chakra-ui/react';

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
];

export default function Navbar(){
  return(
    <Flex align="center" justify="space-around" fontWeight="semibold" bg="gray.200" padding="4">
      {
        links?.map((link)=>(
          <ChakraLink 
            color="red.600"
            as={ReactRouterLink} 
            key={link.to} 
            to={link.to}>
              {link.label}
          </ChakraLink>
        ))  
      }
    </Flex>
  );
}