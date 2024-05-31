import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Input, Textarea, VStack, Select, Button } from "@chakra-ui/react";


import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';


export default function TicketEdit(){
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

    async function editTicket(){
      try {
        console.log(ticket);
        let updatedTicket = {
          title: ticket.title,
          description: ticket.description,
          assignee: ticket.assignee,
          status: ticket.status,
          priority: ticket.priority,
        };

        let response = await axios({
          method: "put",
          url: `http://localhost:3000/tickets/${id}`,
          data: updatedTicket,
        });

        if(response.status === 200){
          navigate("/tickets");
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

    console.log(ticket);

    const {title, status, description, assignee, priority} = ticket;
  return (
    <Container>
      <VStack spacing={6} my={4}>
        <Input 
          placeholder='Enter Title'
          size='lg'
          value={title}
          onChange={(e) => setTicket({...ticket, title: e.target.value})}
          />
        <Textarea 
            placeholder='Enter Description'
            size='lg'
            value={description}
            onChange={(e) => setTicket({...ticket, description: e.target.value})}
            />
        <Select placeholder='Assignee' size='lg' value={assignee} onChange={(e) => setTicket({...ticket, assignee: e.target.value})} >
          <option value='malar'>Malar</option>
          <option value='devi'>Devi</option>
          <option value='sakshi'>Sakshi</option>
        </Select>
        <Select placeholder='Status' size='lg' value={status} onChange={(e) => setTicket({...ticket, status: e.target.value})} >
          <option value='completed'>Completed</option>
          <option value='progress'>Progress</option>
          <option value='pending'>Pending</option>
        </Select>
        <Select placeholder='Priority' size='lg' value={priority} onChange={(e) => setTicket({...ticket, priority: Number(e.target.value)})} >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </Select>
        <Button
          colorScheme='red' 
          variant='solid'
          onClick={editTicket}>Edit Ticket</Button>
      </VStack>
    </Container>
  )
}