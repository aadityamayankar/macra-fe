import { Box, Button, Container, Grid, GridItem, Heading, HStack, Image, StackSeparator, Text, VStack } from '@chakra-ui/react';
import { BreadcrumbLink, BreadcrumbRoot, BreadcrumbCurrentLink } from '@/components/ui/breadcrumb';
import { BsCalendarDate } from 'react-icons/bs';
import { IoMdTime } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import CityMenu from '@/components/fe/CityMenu';
import Link from 'next/link';

export default function EventPage({ params }) {
  const { eventId } = params;

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

  const city = event.cityName.charAt(0).toUpperCase() + event.cityName.slice(1);

  return (
    <Container p={4} maxW={{ base: '85%' }}>
      <BreadcrumbRoot separator="/" separatorGap={2} mb={5}>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <BreadcrumbCurrentLink>
            <CityMenu cities={cities} currentCity={cityName} />
          </BreadcrumbCurrentLink>
        <BreadcrumbCurrentLink>{event.eventName}</BreadcrumbCurrentLink>
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
            <Box>
              <Text>
                {event.description}
              </Text>
            </Box>
            <Box w="100%">
              <HStack justify="space-between" w="100%">
                <Text fontSize="lg">
                  ₹{event.minPrice} onwards
                </Text>
                <Button colorPalette="pink" as={Link} href={`/events/${eventId}/book`}>Book Now</Button>
              </HStack>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}