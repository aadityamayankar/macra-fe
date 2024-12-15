"use client";
import { Container, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import EventBookingCard from '@/components/fe/EventBookingCard';
import { useEffect, useState } from 'react';
import { fetchOrderHistory } from '@/api';
import { BreadcrumbLink, BreadcrumbRoot, BreadcrumbCurrentLink } from '@/components/ui/breadcrumb';
import useStore from '@/store/useStore';

export default function OrderPage() {
  const [bookings, setBookings] = useState([]);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await fetchOrderHistory();
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch order history', error);
      }
    }
    if (isAuthenticated) {
      loadBookings();
    }
  }, [isAuthenticated, setBookings]);

  if (!isAuthenticated) {
    return (
      <Flex align="center" justify="center" h="75vh">
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Please log in to view your orders...
        </Heading>
      </Flex>
    )
  }

  return (
    <Container p={4} maxW="container.md">
      <BreadcrumbRoot separator="/" separatorGap={2} mb={5}>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbCurrentLink>Orders</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
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