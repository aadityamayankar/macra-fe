import { Box, Button, Separator } from '@chakra-ui/react';
import Link from 'next/link';

export default function CityButton({ city }) {

  const cityName = city.name;
  const cityId = city.id;

  return (
    <Box m={5}>
      <Link href={`/city/${cityId}/events`}>
        <Button width={{base: 'md', md: 'xs'}} height="50px" variant="ghost">
          {cityName}
          </Button>
      </Link>
      <Separator />
    </Box>
  );
}