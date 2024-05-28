import { Heading, Input, Button, VStack, Container } from '@chakra-ui/react';
import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContextProvider';

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useContext(AuthContext);

  async function handleSubmit(){
    try {
      let response = await axios({
        method: "post",
        url: "https://reqres.in/api/login",
        data: {
          email,
          password,
        },
      });

      console.log(response);
      console.log(response?.data?.token);
      login(response?.data?.token);


    } catch (error) {
      console.log(error);
    }
  }

  return(
    <Container maxW={450}>

    <VStack spacing={4}>  

      <Heading as="h1" size="xl">
        Login Page
      </Heading>

      <Input 
      placeholder='Email' 
      type='email' 
      value={email} 
      onChange={(e)=>{
        setEmail(e.target.value);
      }}
      />

      <Input 
      placeholder='Password' 
      type='password'
      value={password}
      onChange={(e)=>{
        setPassword(e.target.value);
      }}
      />

      <Button
      colorScheme='red' 
      variant='solid'
      onClick={handleSubmit}
      >LOGIN</Button>
    </VStack>
    </Container>
  );
}