import { Container, Input, Textarea, VStack, Select, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TicketCreate(){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  async function handleCreate(){
    try {
      const newTicket = {
        title: title,
        description: description,
        assignee: assignee,
        status: status,
        priority: priority
      };

      let response = await axios({
        method: "post",
        url: `http://localhost:3000/tickets`,
        data: newTicket,
      });

      console.log(response);

      if(response.status === 201) {
        navigate("/tickets");
      }      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <VStack spacing={6} my={4}>
        <Input 
          placeholder='Enter Title'
          size='lg'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        <Textarea 
            placeholder='Enter Description'
            size='lg'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        <Select placeholder='Assignee' size='lg' value={assignee} onChange={(e) => setAssignee(e.target.value)} >
          <option value='malar'>Malar</option>
          <option value='devi'>Devi</option>
          <option value='sakshi'>Sakshi</option>
        </Select>
        <Select placeholder='Status' size='lg' value={status} onChange={(e) => setStatus(e.target.value)} >
          <option value='completed'>Completed</option>
          <option value='progress'>Progress</option>
          <option value='pending'>Pending</option>
        </Select>
        <Select placeholder='Priority' size='lg' value={priority} onChange={(e) => setPriority(Number(e.target.value))} >
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
          onClick={handleCreate}>Create Ticket</Button>
      </VStack>
    </Container>
  )
}