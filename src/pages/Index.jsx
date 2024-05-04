import { useState } from "react";
import { Container, VStack, Button, Input, Textarea, Text, Box, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", description: "" });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = () => {
    if (!newEvent.name || !newEvent.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setNewEvent({ name: "", description: "" });
    toast({
      title: "Success",
      description: "Event added successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    toast({
      title: "Deleted",
      description: "Event deleted successfully",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const editEvent = (id) => {
    const event = events.find((event) => event.id === id);
    setNewEvent({ name: event.name, description: event.description });
    deleteEvent(id);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Box>
          <Text mb={2}>Add New Event</Text>
          <Input placeholder="Name of the event" mb={2} value={newEvent.name} onChange={handleInputChange} name="name" />
          <Textarea placeholder="Description of the event" mb={2} value={newEvent.description} onChange={handleInputChange} name="description" />
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addEvent}>
            Add Event
          </Button>
        </Box>
        <Box>
          <Text mb={2}>Events List</Text>
          {events.map((event) => (
            <Box key={event.id} p={4} borderWidth="1px" borderRadius="lg" mb={2} display="flex" justifyContent="space-between" alignItems="center">
              <VStack align="start">
                <Text fontWeight="bold">{event.name}</Text>
                <Text>{event.description}</Text>
              </VStack>
              <Box>
                <IconButton aria-label="Edit Event" icon={<FaEdit />} m={1} onClick={() => editEvent(event.id)} />
                <IconButton aria-label="Delete Event" icon={<FaTrash />} colorScheme="red" onClick={() => deleteEvent(event.id)} />
              </Box>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
