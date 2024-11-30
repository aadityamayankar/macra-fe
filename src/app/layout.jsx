import Header from "@/components/fe/Header";
import { Provider } from "@/components/ui/provider";
import Footer from "@/components/fe/Footer";
import { Box, Flex } from "@chakra-ui/react";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"], display: "swap", weight: '600' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={quicksand.className} >
      <body>
        <Provider>
          <Flex direction="column" minHeight="100vh">
            <Header/>
            <Box as="main" flex="1">
              {children}
            </Box>
            <Footer/>
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
