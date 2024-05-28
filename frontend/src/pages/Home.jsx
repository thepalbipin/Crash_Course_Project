import { Box, Heading, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Home(){  

  const toast = useToast();
  const navigate = useNavigate();

  function handleClick(){
    toast({
      title: 'About Page.',
      description: "Welcome to about page.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    navigate('/about');
  }

  return(
    <Box>
      <Heading as="h1" size="xl">
        Home Page
      </Heading>

      <Button   
      colorScheme='red' 
      variant='solid'
      onClick={handleClick}
      >
        About Page
      </Button>
    </Box>
  );
}