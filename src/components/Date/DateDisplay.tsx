import dayjs, { Dayjs } from 'dayjs';
import RelativeTimePlugin from 'dayjs/plugin/relativeTime';
import UpdateLocalePlugin from 'dayjs/plugin/updateLocale';
import * as React from 'react';

import Typography from '../Typography';

import { DateDisplayProps, DateDisplayType } from './DateDisplay.types';

dayjs.extend(RelativeTimePlugin);
dayjs.extend(UpdateLocalePlugin);
dayjs.updateLocale('en', {
  relativeTime: { ...dayjs.Ls.en.relativeTime, s: 'just now' }
});

export const getDateContent = (
  value: string | number | Date | Dayjs,
  dateFormat = 'MMM D, YYYY',
  hourFormat: '12' | '24' = '12',
  type: DateDisplayType = 'relative',
  displayTime = true,
  displayDate = true
) => {
  const now = dayjs();
  const dateValue = dayjs(value);

  // https://day.js.org/docs/en/display/format
  const absoluteDateFormat = [displayDate && dateFormat, displayTime && (hourFormat === '12' ? 'h:mm a' : 'HH:mm')]
    .filter(Boolean)
    .join(' ');

  const absoluteDateString = dateValue.format(absoluteDateFormat);

  // Remove the "ago" / "in" suffix if the time is "just now"
  const withoutSuffix = Math.abs(dateValue.diff(now, 'minute', true)) < 1;
  const relativeDateString = dateValue.isBefore(now)
    ? dateValue.fromNow(withoutSuffix)
    : dateValue.from(now, withoutSuffix);

  return type === 'absolute' ? absoluteDateString : relativeDateString;
};

const DateDisplay: React.FC<DateDisplayProps> = ({
  value,
  color,
  dateFormat = 'MMM D, YYYY',
  displayDate = true,
  displayTime = true,
  hourFormat = '12',
  size,
  type = 'relative'
}) => {
  // Relative timestamps go stale; re-render periodically so they stay accurate
  const [, forceRerender] = React.useState(0);
  React.useEffect(() => {
    if (type !== 'relative') return undefined;
    const interval = setInterval(() => forceRerender((v) => v + 1), 60_000);
    return () => clearInterval(interval);
  }, [type]);

  const content = getDateContent(value, dateFormat, hourFormat, type, displayTime, displayDate);

  return (
    <Typography color={color} mono size={size}>
      {content}
    </Typography>
  );
};

export default DateDisplay;
