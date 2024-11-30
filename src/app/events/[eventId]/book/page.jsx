"use client"
import { Box, Container, Heading, Text, VStack, Button, Image, Grid, GridItem, StackSeparator, HStack } from '@chakra-ui/react';
import { BreadcrumbLink, BreadcrumbRoot, BreadcrumbCurrentLink } from '@/components/ui/breadcrumb';
import { BsCalendarDate } from 'react-icons/bs';
import { IoMdTime } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import CityMenu from '@/components/fe/CityMenu';
import { useState, use } from 'react';
import Ticket from '@/components/fe/Ticket';

export default function BookEventPage({ params }) {
  const { eventId } = use(params);

  // Example event data
  const cityName = 'Delhi';
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Lucknow'];
  const event = {
    id: eventId,
    cityName: 'Delhi',
    eventName: 'Music Concert',
    eventDate: '2023-12-01',
    startTime: '19:00',
    endTime: '22:00',
    Venue: 'Delhi Stadium',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel ligula sit amet dolor convallis efficitur. Morbi eu purus nec nibh pretium efficitur. Donec quis mi turpis. Quisque nec dolor bibendum, placerat ex et, placerat nisl. Ut vel ex ipsum. Nulla quis orci iaculis, feugiat orci sit amet, finibus nibh.',
    imageUrl: '/event_pic.avif',
    minPrice: 500,
  };

  const tickets = [
    { ticketType: 'VIP', ticketPrice: 1000 },
    { ticketType: 'Regular', ticketPrice: 500 },
    { ticketType: 'Economy', ticketPrice: 300 },
  ]

  const [ticketQuantities, setTicketQuantities] = useState({
    VIP: 0,
    Regular: 0,
    Economy: 0,
  });

  const handleQuantityChange = (type, quantity) => {
    setTicketQuantities((prev) => ({
      ...prev,
      [type]: quantity,
    }));
  };

  const calculateTotal = () => {
    return tickets.reduce((total, ticket) => {
      return total + (ticket.ticketPrice * ticketQuantities[ticket.ticketType]);
    }, 0);
  };

  return (
    <Container p={4} maxW={{ base: '85%' }}>
      <BreadcrumbRoot separator="/" separatorGap={2} mb={5}>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <BreadcrumbCurrentLink>
            <CityMenu cities={cities} currentCity={cityName} />
          </BreadcrumbCurrentLink>
        <BreadcrumbLink href={`/events/${eventId}`}>{event.eventName}</BreadcrumbLink>
        <BreadcrumbCurrentLink>Book</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={10}>
        <GridItem borderRadius={'md'} overflow={'hidden'}>
          <Image src={event.imageUrl} alt={event.eventName} />
        </GridItem>
        <GridItem colSpan={{base: 1, md: 2}} >
          <VStack spacing={4} gap={5} align="start" separator={<StackSeparator/>}>
            <Box>
              <Heading as="h1" size="2xl">
                {event.eventName}
              </Heading>
            </Box>
            <Box>
              <Text display="flex" alignItems="center"> <BsCalendarDate style={{marginRight: "5px"}} /> {event.eventDate}</Text>
              <Text display="flex" alignItems="center"> <IoMdTime style={{marginRight: "5px"}} /> {event.startTime} - {event.endTime}</Text>
              <Text display="flex" alignItems="center"> <IoLocationOutline style={{marginRight: "5px"}} /> {event.Venue}</Text>
            </Box>
            <Box w="100%">
              <VStack spacing={4} align="stretch">
                {tickets.map((ticket) => (
                  <Ticket
                    key={ticket.ticketType}
                    ticketType={ticket.ticketType}
                    ticketPrice={ticket.ticketPrice}
                    quantity={ticketQuantities[ticket.ticketType]}
                    setQuantity={(quantity) => handleQuantityChange(ticket.ticketType, quantity)}
                  />
                ))}
              </VStack>
              {ticketQuantities.VIP > 0 || ticketQuantities.Regular > 0 || ticketQuantities.Economy > 0 ? (
                <Box>
                  <Text fontSize="lg" fontWeight="bold">Total: ₹{calculateTotal()}</Text>
                  <Button colorPalette="pink" size="lg" mt={4}>
                    Proceed to Payment
                  </Button>
                </Box>
              ) : null}
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}