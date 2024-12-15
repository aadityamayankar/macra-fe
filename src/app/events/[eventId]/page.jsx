'use client';
import { useEffect, useState, use } from 'react';
import useStore from '@/store/useStore';
import { Box, Button, Container, Grid, GridItem, Heading, HStack, Image, StackSeparator, Text, VStack } from '@chakra-ui/react';
import { BreadcrumbLink, BreadcrumbRoot, BreadcrumbCurrentLink } from '@/components/ui/breadcrumb';
import { BsCalendarDate } from 'react-icons/bs';
import { IoMdTime } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { secondsSinceEpochToDate, secondsSinceEpochToTime } from '@/utils';
import { fetchEventById, fetchCities } from '@/api';
import CityMenu from '@/components/fe/CityMenu';
import Link from 'next/link';

export default function EventPage({ params }) {
  const { eventId } = use(params);

  const cities = useStore((state) => state.cities);
  const setCities = useStore((state) => state.setCities);
  const setEvents = useStore((state) => state.setEvents);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEventData = async () => {
      if (cities.length === 0) {
        const fetchedCities = await fetchCities();
        setCities(fetchedCities);
      }
      const fetchedEvent = await fetchEventById(eventId);
      setEvent(fetchedEvent);
    };

    getEventData();
  }, [eventId, cities, setEvents, setCities]);

  if (!event) {
    return <Text>Loading...</Text>;
  }

  const cityName = event.cityName.charAt(0).toUpperCase() + event.cityName.slice(1);
  const eventDate = secondsSinceEpochToDate(event.startDate);
  const eventStartTime = secondsSinceEpochToTime(event.startDate);
  const eventEndTime = secondsSinceEpochToTime(event.endDate);
  const eventMinPrice = Math.min(...event.tickets.map((ticket) => ticket.price));
  const decodedEventId = decodeURIComponent(eventId);

  return (
    <Container p={4} maxW={{ base: '85%' }}>
      <BreadcrumbRoot separator="/" separatorGap={2} mb={5}>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <CityMenu cities={cities} currentCity={cityName} />
        <BreadcrumbCurrentLink>{event.name}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={10}>
        <GridItem borderRadius={'md'} overflow={'hidden'}>
          <Image src={`data:image/jpeg;base64,${event.cover}`} alt={event.name} />
        </GridItem>
        <GridItem colSpan={{base: 1, md: 2}} >
          <VStack spacing={4} gap={5} align="start" separator={<StackSeparator/>}>
            <Box>
              <Heading as="h1" size="2xl">
                {event.name}
              </Heading>
            </Box>
            <Box>
              <Text display="flex" alignItems="center"> <BsCalendarDate style={{marginRight: "5px"}} /> {eventDate}</Text>
              <Text display="flex" alignItems="center"> <IoMdTime style={{marginRight: "5px"}} /> {eventStartTime} - {eventEndTime}</Text>
              <Text display="flex" alignItems="center"> <IoLocationOutline style={{marginRight: "5px"}} /> {event.location}</Text> 
            </Box>
            <Box>
              <Text>
                {event.description}
              </Text>
            </Box>
            <Box w="100%">
              <HStack justify="space-between" w="100%">
                <Text fontSize="lg">
                  ₹{eventMinPrice} onwards
                </Text>
                <Button colorPalette="pink" as={Link} href={`/events/${decodedEventId}/book`}>Book Now</Button>
              </HStack>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}