import {
  Button, 
  Flex, 
  SimpleGrid,
  Select,
  Container
    } from '@chakra-ui/react';

  import { useNavigate } from 'react-router-dom';
  import { useState, useEffect } from 'react';
  import axios from 'axios';

  import LoadingIndicator from '../components/LoadingIndicator';
  import ErrorIndicator from '../components/ErrorIndicator';
  import TicketCard from '../components/TicketCard';



export default function Tickets(){
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(false);
    const [sortOrderValue, setSortOrderValue] = useState("");
    const [filterValue, setFilterValue] = useState("");

    async function fetchAndUpdateData(sortOrderValue, filterValue){
      setLoading(true);
      try {
        let queryParams= {};
        if(filterValue){
          queryParams.status = filterValue;
        }

        if(sortOrderValue){
          queryParams._sort = "priority";
          queryParams._order = sortOrderValue;
        }

        let response = await axios({
          method: "get",
          url: `http://localhost:3000/tickets`,
          params: queryParams,
        });

        let data = response?.data;
        setLoading(false)
        setTickets(data);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    }

    useEffect(()=>{
      fetchAndUpdateData(sortOrderValue, filterValue)
    }, [sortOrderValue, filterValue]);

    if(loading){
      return <LoadingIndicator />
    }

    if(error){
      return <ErrorIndicator />
    }

    console.log(`loading, ${loading} - error, ${error}`);
    console.log(`tickets`, tickets);

  return(
    <Container maxW="container.xl">
      <Flex direction="row-reverse">
        <Button
        colorScheme='red' 
        variant='solid'
        onClick={() => {
          navigate("/ticket/create");
        }}
        marginY={6}
        >Create Tickets</Button>
      </Flex>

      <Flex marginY={6}>
      <Select 
        placeholder='Sort by Priority'
        value={sortOrderValue}
        onChange={(e)=>{
          setSortOrderValue(e.target.value);
        }}
      >
        <option value='asc'>Low to High</option>
        <option value='desc'>High to Low</option>
      </Select>
      <Select 
        placeholder='Filter by Status'
        value={filterValue}
        onChange={(e)=>{
          setFilterValue(e.target.value);
        }}
      >
        <option value='Pending'>Pending</option>
        <option value='Progress'>Progress</option>
        <option value='Completed'>Completed</option>
      </Select>

      </Flex>
      
      <SimpleGrid columns={{base: 1, md:2, lg: 3}} spacing={10}>
      {tickets?.map((ticket)=>(
        <TicketCard {...ticket} key={ticket.id} />
      ))}
      </SimpleGrid>

    </Container>

  )
}