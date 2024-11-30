import Link from 'next/link';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../ui/menu';
import { BreadcrumbCurrentLink } from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';

export default function CityMenu({ cities, currentCity }) {

  const city = currentCity.charAt(0).toUpperCase() + currentCity.slice(1);

  return (
    <MenuRoot>
      <MenuTrigger>
        <BreadcrumbCurrentLink display="flex" alignItems="center">
          {city}
          <LuChevronDown style={{ marginLeft: '5px' }} />
        </BreadcrumbCurrentLink>
      </MenuTrigger>
      <MenuContent>
        {cities.map((city) => (
          <MenuItem key={city} value={city} as={Link} href={`/city/${city.toLowerCase()}/events`}>
            {city}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
}