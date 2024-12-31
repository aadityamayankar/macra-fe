'use client';
import { useEffect } from 'react';
import Header from "@/components/fe/Header";
import { Provider } from "@/components/ui/provider";
import Footer from "@/components/fe/Footer";
import { Box, Flex } from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import useStore from '@/store/useStore';
import { validateSession, fetchUserProfile } from '@/api';
import { Analytics } from '@vercel/analytics';

const quicksand = Quicksand({ subsets: ["latin"], display: "swap", weight: '600' });

export const metadata = {
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({ children }) {
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const setUserProfile = useStore((state) => state.setUserProfile);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const isAuthenticated = await validateSession();
        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          const userProfile = await fetchUserProfile();
          setUserProfile(userProfile);
        }
      } catch (error) {
        console.error('Failed to check session or fetch user profile:', error);
      }
    };

    checkSession();
  }, [setIsAuthenticated, setUserProfile]);

  return (
    <html lang="en" suppressHydrationWarning className={quicksand.className}>
      <body>
        <Provider>
          <Flex direction="column" minHeight="100vh">
            <Header />
            <Box as="main" flex="1">
              {children}
            </Box>
            <Footer />
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
