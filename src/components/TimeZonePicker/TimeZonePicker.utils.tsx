import { getTimeZones, TimeZone } from '@vvo/tzdb';
import * as React from 'react';

import Typography from '../Typography';

export const uniqueTimezones = getTimeZones();

const getCityNameForTZ = (tz: TimeZone) => tz.name.split('/')[1]?.replace(/_/g, ' ') ?? tz.name;

// GMT-XX:XX City abbrev
export const stringifyTimeZone = (currTimeZone: TimeZone) =>
  `GMT${currTimeZone.currentTimeFormat.split(' ')[0]} / ${currTimeZone.alternativeName} / ${getCityNameForTZ(
    currTimeZone
  )}`;

export const renderCustomLabel = (currTimeZone: TimeZone) => (
  <Typography color='secondary' mono>
    GMT{currTimeZone.currentTimeFormat.split(' ')[0]} {currTimeZone.alternativeName} {getCityNameForTZ(currTimeZone)}
  </Typography>
);

/** Checks whether the given time zone includes the given query */
export const timeZoneIncludesQuery = (tz: TimeZone, query: string) => {
  const { abbreviation, name, alternativeName, countryName, mainCities } = tz;
  const comparableQuery = query.toLowerCase();

  return (
    abbreviation.toLowerCase().includes(comparableQuery) ||
    name.toLowerCase().includes(comparableQuery) ||
    alternativeName.toLowerCase().includes(comparableQuery) ||
    countryName.toLowerCase().includes(comparableQuery) ||
    mainCities.some((city) => city.toLowerCase().includes(comparableQuery))
  );
};
