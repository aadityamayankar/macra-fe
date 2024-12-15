import Link from 'next/link';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../ui/menu';
import { Box } from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';

export default function CityMenu({ cities, currentCity }) {

  const city = currentCity.charAt(0).toUpperCase() + currentCity.slice(1);

  return (
    <MenuRoot>
      <MenuTrigger>
        <Box display="flex" alignItems="center">
          {city}
          <LuChevronDown style={{ marginLeft: '5px' }} />
        </Box>
      </MenuTrigger>
      <MenuContent>
        {cities.map((city) => (
          <MenuItem key={city.id} value={city} as={Link} href={`/city/${city.id}/events`}>
            {city.name}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
}