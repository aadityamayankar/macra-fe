'use client';

import { useEffect, useState, use } from 'react';
import useStore from '@/store/useStore';
import CityMenu from '@/components/fe/CityMenu';
import EventCard from '@/components/fe/EventCard';
import { BreadcrumbLink, BreadcrumbRoot, BreadcrumbCurrentLink } from '@/components/ui/breadcrumb';
import { Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { fetchCities, fetchCityById, fetchEventsByCity } from '@/api';

export default function CityEvents({ params }) {
  const { cityId } = use(params);
  const cities = useStore((state) => state.cities);
  const setCities = useStore((state) => state.setCities);
  const [city, setCity] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getCityData = async () => {
      if (cities.length === 0) {
        const fetchedCities = await fetchCities();
        setCities(fetchedCities);
      }
      const fetchedCity = await fetchCityById(cityId);
      setCity(fetchedCity);
      const fetchedEvents = await fetchEventsByCity(fetchedCity.name);
      setEvents(fetchedEvents);
    };

    getCityData();
  }, [cityId, cities, setCities]);

  if (!city) {
    return <Text>Loading...</Text>;
  }

  const cityName = city.name.charAt(0).toUpperCase() + city.name.slice(1);

  return (
    <Container p={4} maxW={{ base: '85%' }}>
      <BreadcrumbRoot separator="/" separatorGap={2} mb={5}>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbCurrentLink>
          <CityMenu cities={cities} currentCity={cityName} />
        </BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <VStack spacing={4} align="center" mb={8} m={10}>
        <Heading as="h1" size="2xl">
          Explore all events in {cityName}
        </Heading>
        <Text fontSize="lg">
          Experience {cityName}'s culture
        </Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
        {events.map((event) => (
          <EventCard
            key={event.id}
            eventId={event.id}
            eventCover={event.cover}
            eventName={event.name}
            eventStartDate={event.startDate}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}