import { Box, Button, Separator } from '@chakra-ui/react';
import Link from 'next/link';

export default function CityButton({ cityName }) {

  return (
    <Box m={5}>
      <Link href={`/city/${cityName.toLowerCase()}/events`}>
        <Button width={{base: 'md', md: 'xs'}} height="50px" variant="ghost">
          {cityName}
          </Button>
      </Link>
      <Separator />
    </Box>
  );
}