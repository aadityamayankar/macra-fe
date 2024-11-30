"use client";
import CityButton from '@/components/fe/CityButton';
import { Box, Container, Image, Text, VStack } from '@chakra-ui/react';

export default function Home() {
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Lucknow'];
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <VStack spacing={4} gap={5} mt={10}>
        <Image src="./logo.svg" alt="Company Logo" height="20" />
        <Text fontSize={{base: 'lg', md: 'xl'}} textAlign="center">
          Book tickets to live events and concerts
        </Text>
      </VStack>
      <Box mt={8} textAlign="center">
        <Text fontSize={{base: 'lg', md: 'xl'}} mb={4}>
          Select a city to get started
        </Text>
        <Container display="flex" justifyContent="center" flexWrap="wrap">
          {cities.map((city) => (
            <CityButton key={city} cityName={city} />
          ))}
        </Container>
      </Box>
    </Box>
  );
}
