import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import EventBookingCard from '@/components/fe/EventBookingCard';

export default function OrderPage() {
  // Example bookings data
  const bookings = [
    {
      eventName: 'Music Concert',
      eventDate: '2023-12-01',
      eventStartTime: '19:00',
      eventEndTime: '22:00',
      eventVenue: 'Delhi Stadium',
      eventImage: '/event_pic.avif',
      totalAmount: 1500,
      ticketQuantities: {
        VIP: 1,
        Regular: 2,
      },
    },
    {
      eventName: 'Art Exhibition',
      eventDate: '2023-12-05',
      eventStartTime: '11:00',
      eventEndTime: '15:00',
      eventVenue: 'Art Gallery',
      eventImage: '/event_pic1.avif',
      totalAmount: 600,
      ticketQuantities: {
        Regular: 2,
      },
    },
  ];

  return (
    <Container p={4} maxW="container.md">
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Your Events
      </Heading>
      {bookings.length === 0 ? (
        <Text fontSize="lg" textAlign="center">
          It's a little empty in here...
        </Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {bookings.map((booking, index) => (
            <EventBookingCard key={index} booking={booking} />
          ))}
        </VStack>
      )}
    </Container>
  );
}