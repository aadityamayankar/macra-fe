'use client';
import { Box, Flex, Image, Menu, Spacer, Button } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import AuthDialog from './AuthDialog';
import useStore from '@/store/useStore';
import Link from 'next/link';
import { logoutUser } from '@/api';

export default function Header() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const userProfile = useStore((state) => state.userProfile);
  const setUserProfile = useStore((state) => state.setUserProfile);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsAuthenticated(false);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box as="header" color="white" p={4}>
      <Flex align="center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" maxBlockSize={10} mr={4} />
        </Link>
        <Spacer />
        {isAuthenticated && userProfile ? (
          <MenuRoot>
            <MenuTrigger>
              <Avatar size="sm" name={userProfile.name} />
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="orders" as={Link} href="/history">Orders</MenuItem>
              <MenuItem value="logout" onClick={handleLogout}>Logout</MenuItem>
            </MenuContent>
          </MenuRoot>
        ) : (
          <AuthDialog />
        )}
      </Flex>
    </Box>
  );
}