import { Box, Flex, Text, Button, HStack } from '@chakra-ui/react';

export default function Ticket({ ticketType, ticketPrice, quantity, setQuantity }) {
  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    setQuantity(quantity - 1);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mb={4}>
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="lg" fontWeight="bold">{ticketType}</Text>
          <Text fontSize="md">₹{ticketPrice}</Text>
        </Box>
        {quantity === 0 ? (
          <Button onClick={handleAdd} colorPalette="green" variant="surface" size="xs">ADD +</Button>
        ) : (
          <HStack>
            <Button onClick={handleRemove} colorPalette="red" variant="surface" size="xs">-</Button>
            <Text fontSize="xs">{quantity}</Text>
            <Button onClick={handleAdd} colorPalette="green" variant="surface" size="xs">+</Button>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}