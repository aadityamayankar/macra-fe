'use client';
import { useEffect, useState, use } from 'react';
import { Container, Heading, Text, VStack, Grid, GridItem, Box, Image, Button, HStack, StackSeparator } from '@chakra-ui/react';
import { BsCalendarDate } from 'react-icons/bs';
import { IoMdTime } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { BreadcrumbLink, BreadcrumbRoot, BreadcrumbCurrentLink } from '@/components/ui/breadcrumb';
import { Toaster, toaster } from "@/components/ui/toaster";
import useStore from '@/store/useStore';
import { fetchEventById, fetchCities, bookTickets } from '@/api';
import { secondsSinceEpochToDate, secondsSinceEpochToTime } from '@/utils';
import CityMenu from '@/components/fe/CityMenu';
import Ticket from '@/components/fe/Ticket';
import { loadRazorpayScript } from '@/utils';
import { useRouter } from 'next/navigation';

export default function BookEventPage({ params }) {
  const { eventId } = use(params);
  const cities = useStore((state) => state.cities);
  const setCities = useStore((state) => state.setCities);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const [event, setEvent] = useState(null);
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getEventData = async () => {
      if (cities.length === 0) {
        const fetchedCities = await fetchCities();
        setCities(fetchedCities);
      }
      const fetchedEvent = await fetchEventById(eventId);
      setEvent(fetchedEvent);
      const initialQuantities = {};
      fetchedEvent.tickets.forEach(ticket => {
        initialQuantities[ticket.ticketType] = 0;
      });
      setTicketQuantities(initialQuantities);
      setLoading(false);
    };

    getEventData();
  }, [eventId, cities, setCities]);

  if (loading || !event) {
    return <Text>Loading...</Text>;
  }

  const cityName = event.cityName.charAt(0).toUpperCase() + event.cityName.slice(1);
  const decodedEventId = decodeURIComponent(eventId);
  const eventDate = secondsSinceEpochToDate(event.startDate);
  const eventStartTime = secondsSinceEpochToTime(event.startDate);
  const eventEndTime = secondsSinceEpochToTime(event.endDate);
  const eventMinPrice = Math.min(...event.tickets.map((ticket) => ticket.price));
  const tickets = event.tickets;

  const handleQuantityChange = (type, quantity) => {
    setTicketQuantities((prev) => {
      const availableQuantity = tickets.find(ticket => ticket.ticketType === type).availableQuantity;
      return {
        ...prev,
        [type]: Math.min(quantity, availableQuantity),
      };
    });
  };

  const calculateTotal = () => {
    return tickets.reduce((total, ticket) => {
      return total + (ticket.price * ticketQuantities[ticket.ticketType]);
    }, 0);
  };

  const handleProceedToPayment = async () => {
    if (!isAuthenticated) {
      toaster.create({
        title: 'Authentication required',
        description: 'Please login to proceed with the booking.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toaster.create({
        title: 'Razorpay SDK failed to load',
        description: 'Please check your internet connection and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const ticketType = Object.keys(ticketQuantities).find(
        (type) => ticketQuantities[type] > 0
      );
      const ticketId = event.tickets.find((ticket) => ticket.ticketType === ticketType).id;
      const quantity = ticketQuantities[ticketType];
      const bookingResponse = await bookTickets(decodedEventId, ticketId, quantity);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        name: 'Event Booking',
        description: 'Ticket Booking',
        order_id: bookingResponse.id,
        handler: function (response) {
          toaster.create({
            title: 'Payment successful',
            description: 'Your payment was successful.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          router.push('/history');
        },
        modal: {
          ondismiss: function () {
            toaster.create({
              title: 'Payment cancelled',
              description: 'You cancelled the payment.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          },
        },
      };

      const rzp = new Razorpay(options);

      rzp.on('payment.failed', function (response) {
        console.log('Payment failed:', response);
        toaster.create({
          title: 'Payment failed',
          description: response.error.description,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
      rzp.open();
    } catch (error) {
      toaster.create({
        title: 'Booking failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isOtherTicketSelected = Object.values(ticketQuantities).some((quantity) => quantity > 0);

  return (
    <Container p={4} maxW={{ base: '85%' }}>
      <Toaster />
      <BreadcrumbRoot separator="/" separatorGap={2} mb={5}>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <CityMenu cities={cities} currentCity={cityName} />
        <BreadcrumbLink href={`/events/${decodedEventId}`}>{event.name}</BreadcrumbLink>
        <BreadcrumbCurrentLink>Book</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={10}>
        <GridItem borderRadius={'md'} overflow={'hidden'}>
          <Image src={`data:image/jpeg;base64,${event.cover}`} alt={event.name} />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <VStack spacing={4} gap={5} align="start" separator={<StackSeparator />}>
            <Box>
              <Heading as="h1" size="2xl">
                {event.name}
              </Heading>
            </Box>
            <Box>
              <Text display="flex" alignItems="center"> <BsCalendarDate style={{ marginRight: "5px" }} /> {eventDate}</Text>
              <Text display="flex" alignItems="center"> <IoMdTime style={{ marginRight: "5px" }} /> {eventStartTime} - {eventEndTime}</Text>
              <Text display="flex" alignItems="center"> <IoLocationOutline style={{ marginRight: "5px" }} /> {event.location}</Text>
            </Box>
            <Box w="100%">
              <VStack spacing={4} align="stretch">
                {tickets.map((ticket) => (
                  <Ticket
                    key={ticket.ticketType}
                    ticketType={ticket.ticketType}
                    ticketPrice={ticket.price}
                    quantity={ticketQuantities[ticket.ticketType]}
                    setQuantity={(quantity) => handleQuantityChange(ticket.ticketType, quantity)}
                    availableQuantity={ticket.availableQuantity}
                    isAnyTicketAdded={isOtherTicketSelected}
                  />
                ))}
              </VStack>
              {isOtherTicketSelected && (
                <Box>
                  <Text fontSize="lg" fontWeight="bold">Total: ₹{calculateTotal()}</Text>
                  <Button colorPalette="pink" size="lg" mt={4} onClick={handleProceedToPayment}>
                    Proceed to Payment
                  </Button>
                </Box>
              )}
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}