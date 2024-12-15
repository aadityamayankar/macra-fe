import { Box, Image, Text, Flex } from '@chakra-ui/react';
import { secondsSinceEpochToDate } from '@/utils';
import Link from 'next/link';

export default function EventCard({ eventId, eventCover, eventName, eventStartDate }) {
  const eventDate = secondsSinceEpochToDate(eventStartDate);
  return (
    <Box position="relative" borderRadius="md" overflow="hidden" boxShadow="lg" as={Link} href={`/events/${eventId}`}>
      <Image src={`data:image/jpeg;base64,${eventCover}`} alt={eventName} objectFit="cover" width="100%"/>
      <Box position="absolute" bottom="0" left="0" right="0" p={4} 
        bgGradient="linear-gradient(0deg, rgba(0, 0, 0, 0.9), transparent 150%)" borderTopRadius={"25px"} boxShadow={"0 0 150px 0 rgba(0, 0, 0, 0.5)"}>
        <Flex justify="space-between" align="flex-end">
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white">
              {eventName}
            </Text>
            <Text fontSize="sm" color="white">
              {eventDate}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}