"use client";
import { Box, Flex, Image, Heading, Spacer, Avatar } from '@chakra-ui/react';
import AuthDialog from './AuthDialog';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Box as="header" color="white" p={4}>
      <Flex align="center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" maxBlockSize={10} mr={4} />
        </Link>
        <Spacer />
        {isAuthenticated ? (
          <Avatar size="sm" name="John Doe" src="https://bit.ly/broken-link" />
        ) : (
          <AuthDialog />
        )}
      </Flex>
    </Box>
  );
}