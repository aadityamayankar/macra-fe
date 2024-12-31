import { Box, Flex, Text, VStack, Image, SimpleGrid } from '@chakra-ui/react';
import { BsCalendarDate } from 'react-icons/bs';
import { IoMdTime } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';

export default function EventBookingCard({ booking }) {
  const eventDate = secondsSinceEpochToDate(booking.eventStartDate);
  const eventStartTime = secondsSinceEpochToTime(booking.eventStartDate);
  const eventEndTime = secondsSinceEpochToTime(booking.eventEndDate);
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mb={4} boxShadow="md">
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} gap={5}>
        <Box gridColumn={{ base: 'span 1', md: 'span 1' }} display="flex" justifyContent="center" alignItems="flex-start">
          <Image src={`data:image/jpeg;base64,${booking.eventCover}`} alt={booking.eventName} borderRadius="md" maxH={{base: 'lg', md: '2xs'}} objectFit="contain" />
        </Box>
        <VStack align="start" spacing={2} gridColumn={{ base: 'span 1', md: 'span 3' }} height="100%">
          <Text fontSize="lg" fontWeight="bold">{booking.eventName}</Text>
          <Text fontSize="sm" display="flex" alignItems="center"> <BsCalendarDate style={{ marginRight: "5px" }} /> {eventDate} </Text>
          <Text fontSize="sm" display="flex" alignItems="center"> <IoMdTime style={{ marginRight: "5px" }} /> {eventStartTime} - {eventEndTime} </Text>
          <Text fontSize="sm" display="flex" alignItems="center"> <IoLocationOutline style={{ marginRight: "5px" }} /> {booking.eventLocation} </Text>
          <Text fontSize="sm">Total Amount Paid: ₹{booking.totalAmount}</Text>
          <Text fontSize="sm">Booked Tickets:</Text>
          <Flex direction="column" pl={4}>
            {booking.tickets.map((ticket, index) => (
              <Text key={index} fontSize="sm">{Object.keys(ticket)[0]}: {Object.values(ticket)[0]}</Text>
            ))}
          </Flex>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}