import CityMenu from '@/components/fe/CityMenu';
import EventCard from '@/components/fe/EventCard';
import { BreadcrumbLink, BreadcrumbRoot, BreadcrumbCurrentLink } from '@/components/ui/breadcrumb';
import { Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';

export default function CityEvents({ params }) {
  const { cityName } = params;
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Lucknow'];

  const city = cityName.charAt(0).toUpperCase() + cityName.slice(1);

  // Example events data
  const events = [
    {
      id: 1,
      imageUrl: '/event_pic.avif',
      eventName: 'Music Concert',
      eventDate: '2023-12-01',
      minPrice: 500,
    },
    {
      id: 2,
      imageUrl: '/event_pic1.avif',
      eventName: 'Art Exhibition',
      eventDate: '2023-12-05',
      minPrice: 300,
    },
    {
      id: 3,
      imageUrl: '/event_pic1.avif',
      eventName: 'Art Exhibition',
      eventDate: '2023-12-05',
      minPrice: 300,
    },
    // Add more events as needed
  ];

  return (
    <Container p={4} maxW={{base: "85%"}}>
      <BreadcrumbRoot separator="/" separatorGap={2} mb={5}>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <BreadcrumbCurrentLink>
            <CityMenu cities={cities} currentCity={cityName} />
          </BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <VStack spacing={4} align="center" mb={8} m={10}>
        <Heading as="h1" size="2xl">
          Explore all events in {city}
        </Heading>
        <Text fontSize="lg">
          Experience {city}'s culture
        </Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} >
        {events.map((event) => (
          <EventCard
            key={event.id}
            eventId={event.id}
            imageUrl={event.imageUrl}
            eventName={event.eventName}
            eventDate={event.eventDate}
            minPrice={event.minPrice}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}