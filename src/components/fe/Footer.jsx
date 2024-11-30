import { Box, HStack, Image, StackSeparator, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box as="footer" color="white" p={4} mt={10}>
      <VStack spacing={4} gap={5} align="stretch" separator={<StackSeparator/>} >
        <HStack justify="flex-start">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" maxBlockSize={6} />
        </Link>
        </HStack>
        <Text textAlign="center" flex="1" mx={4} fontSize={{base: '2xs', md: 'xs'}}>
          By using this platform, you agree to the terms of services, privacy policy, and cookie policy.
        </Text>
      </VStack>
    </Box>
  );
}