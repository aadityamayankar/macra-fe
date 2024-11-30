import { Box, Flex, Text, VStack, Image, SimpleGrid } from '@chakra-ui/react';
import { BsCalendarDate } from 'react-icons/bs';
import { IoMdTime } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';

export default function EventBookingCard({ booking }) {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mb={4} boxShadow="md">
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} gap={5}>
        <Box gridColumn={{ base: 'span 1', md: 'span 1' }} display="flex" justifyContent="center" alignItems="flex-start">
          <Image src={booking.eventImage} alt={booking.eventName} borderRadius="md" maxH={{base: 'lg', md: '2xs'}} objectFit="contain" />
        </Box>
        <VStack align="start" spacing={2} gridColumn={{ base: 'span 1', md: 'span 3' }} height="100%">
          <Text fontSize="lg" fontWeight="bold">{booking.eventName}</Text>
          <Text fontSize="sm" display="flex" alignItems="center"> <BsCalendarDate style={{ marginRight: "5px" }} /> {booking.eventDate}</Text>
          <Text fontSize="sm" display="flex" alignItems="center"> <IoMdTime style={{ marginRight: "5px" }} /> {booking.eventStartTime} - {booking.eventEndTime}</Text>
          <Text fontSize="sm" display="flex" alignItems="center"> <IoLocationOutline style={{ marginRight: "5px" }} /> {booking.eventVenue}</Text>
          <Text fontSize="sm">Total Amount Paid: ₹{booking.totalAmount}</Text>
          <Text fontSize="sm">Booked Tickets:</Text>
          <Flex direction="column" pl={4}>
            {Object.entries(booking.ticketQuantities).map(([type, quantity]) => (
              <Text key={type} fontSize="sm">{type}: {quantity}</Text>
            ))}
          </Flex>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}