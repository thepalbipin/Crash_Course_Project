import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card, 
  CardHeader, 
  CardBody, 
  Heading, 
  Stack,
  StackDivider, 
  Text, 
  CardFooter,
  Button,
  Box,
  HStack
} from "@chakra-ui/react";


import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';



export default function TicketView(){
  const {id} = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState({});
  const [error, setError] = useState(false);

  async function fetchAndUpdateData(id){
    setLoading(true);
    try {
      let response = await axios({
        method: "get",
        url: `http://localhost:3000/tickets/${id}`,
      });

      let data = response?.data;
      setLoading(false)
      setTicket(data);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }

    useEffect(()=>{
      fetchAndUpdateData(id);
    }, [id]);

    async function deleteTicket(){
      try {
        let response = await axios({
          method: "delete",
          url: `http://localhost:3000/tickets/${id}`,
        });

        if(response.status === 200){
          navigate('/tickets');
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(loading){
      return <LoadingIndicator />
    }

    if(error){
      return <ErrorIndicator />
    }

    const {title, status, description, assignee, priority} = ticket;
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size='md'>{title}</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Status
              </Heading>
              <Text pt='2' fontSize='sm'>
                {status}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Priority
              </Heading>
              <Text pt='2' fontSize='sm'>
                {priority}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Description
              </Heading>
              <Text pt='2' fontSize='sm'>
                {description}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Assignee
              </Heading>
              <Text pt='2' fontSize='sm'>
                {assignee}
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <HStack spacing={4}>
            <Button 
            variant='solid' 
            colorScheme='red'
            onClick={()=>{navigate(`/ticket/edit/${id}`)}}
            >
              Edit Ticket
            </Button>
            <Button 
            variant='solid' 
            colorScheme='red'
            onClick={deleteTicket}
            >
              Delete Ticket
            </Button>
          </HStack>
        </CardFooter>
      </Card>
    </>
  )
}