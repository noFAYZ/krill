import { Dayjs } from 'dayjs';

import { TwelveHourPeriod } from '../../types';

import { TimeFieldHourFormat } from './TimeField.types';

export const HOUR_FORMAT_PATTERN: Record<TimeFieldHourFormat, string> = {
  '12': 'h:mm A',
  '24': 'HH:mm'
};

export const dateToFormatString = (date: Dayjs, hourFormat: TimeFieldHourFormat) =>
  date.format(HOUR_FORMAT_PATTERN[hourFormat]);

/** Returns the first <= 4 integers in the given time string, keeping a colon if present */
export const getCustomTimeHoursAndMinutes = (time: string) => {
  let parsedTime = '';
  let colonFound = false;
  // Iterate 5 times in case there's a colon
  for (let i = 0; i < 5; i += 1) {
    const el = time.charAt(i);
    if (!isNaN(parseInt(el, 10)) || el === ':') {
      parsedTime += el;
      if (el === ':' && !colonFound) colonFound = true;
    }
    if (!colonFound && parsedTime.length === 4) break;
  }

  return parsedTime;
};

/** Adds a colon to the mid-point of the string and returns it */
export const addMissingColon = (timeWithoutColon: string) => {
  if (!timeWithoutColon.length) return timeWithoutColon;

  let normalized = timeWithoutColon;
  if (normalized.length <= 2) {
    // 1 or 2-digit hour value: pad with trailing zeroes for the minutes
    normalized += '0'.repeat(normalized.length);
  } else if (normalized.length <= 3) {
    // 2-digit hour + 1-digit minute: pad the minute with a leading 0
    normalized = `${normalized.substring(0, 2)}0${normalized.substring(2)}`;
  }

  const colonIndex = normalized.length / 2;
  return normalized.slice(0, colonIndex) + ':' + normalized.slice(colonIndex);
};

/** Returns the last <= 2 non-integer characters in the time string, corresponding to AM / PM */
export const getExistingCustomTimeXM = (time: string) => {
  let xm = '';
  const xValue = time.charAt(time.length - 2);
  const mValue = time.charAt(time.length - 1);
  if (isNaN(parseInt(xValue, 10)) && xValue !== ' ') xm += xValue;
  if (isNaN(parseInt(mValue, 10))) xm += mValue;
  return xm;
};

/** Gets the correct AM / PM value that should be appended to the time string */
export const getMissingCustomTimeXM = (
  xm: string,
  hoursAndMinutes: string,
  hourFormat: TimeFieldHourFormat,
  initialTime?: Dayjs
) => {
  if (xm.length === 1 && (xm === 'A' || xm === 'P')) {
    // Incomplete AM / PM (user only entered A or P): auto-add the missing M
    return xm + 'M';
  }

  // AM / PM doesn't exist in the time string; derive it from the initial time
  const newTimeArr = hoursAndMinutes.split(':');
  const [newTimeHour, newTimeMinute] = [parseInt(newTimeArr[0], 10), parseInt(newTimeArr[1], 10)];

  // Even in 12-hour format, the user can still input the time in 24-hour format. Hour 0 is always AM
  if (newTimeHour === 0) return TwelveHourPeriod.AM;

  let [initialTimeHour, initialTimeMinute, initialTimeXM] = [12, 0, TwelveHourPeriod.AM];

  if (initialTime && newTimeHour <= 12) {
    // User entered the time in 12-hour format; convert the initial time into 12-hour format too
    const formattedInitialTime = dateToFormatString(initialTime, hourFormat);
    const initialTimeArr = getCustomTimeHoursAndMinutes(formattedInitialTime).split(':');
    [initialTimeHour, initialTimeMinute, initialTimeXM] = [
      parseInt(initialTimeArr[0] ?? '0', 10),
      parseInt(initialTimeArr[1] ?? '0', 10),
      getExistingCustomTimeXM(formattedInitialTime) as TwelveHourPeriod
    ];
  } else if (initialTime && newTimeHour > 12) {
    // User entered the time in 24-hour format; keep the initial time as is
    [initialTimeHour, initialTimeMinute, initialTimeXM] = [
      initialTime.hour(),
      initialTime.minute(),
      initialTime.hour() < 12 ? TwelveHourPeriod.AM : TwelveHourPeriod.PM
    ];
  }

  // Switch the initial time's XM if the new time is 12 and the initial time isn't, or its minutes
  // precede the new time's minutes, or the new time is otherwise smaller than the initial time
  const shouldSwitchXM =
    (newTimeHour === 12 && (initialTimeHour !== 12 || newTimeMinute < initialTimeMinute)) ||
    (newTimeHour < initialTimeHour && initialTimeHour !== 12) ||
    (newTimeHour === initialTimeHour && newTimeMinute < initialTimeMinute);

  return shouldSwitchXM
    ? initialTimeXM === TwelveHourPeriod.AM
      ? TwelveHourPeriod.PM
      : TwelveHourPeriod.AM
    : initialTimeXM;
};

/**
 * Parses a user-entered custom time string by auto-adding missing colons and auto-completing
 * missing/incomplete AM-PM for 12-hour formats.
 */
export const parseCustomTime = (customTime: string, hourFormat: TimeFieldHourFormat, initialTime?: Dayjs): string => {
  const time = customTime.trim().toUpperCase();
  let hoursAndMinutes = getCustomTimeHoursAndMinutes(time);
  let xm = hourFormat === '12' ? getExistingCustomTimeXM(time) : undefined;

  const isColonMissing = !time.includes(':');
  if (isColonMissing) hoursAndMinutes = addMissingColon(hoursAndMinutes);

  if (xm !== undefined) {
    const isXmMissing = xm !== TwelveHourPeriod.AM && xm !== TwelveHourPeriod.PM;
    if (isXmMissing) xm = getMissingCustomTimeXM(xm, hoursAndMinutes, hourFormat, initialTime);
  }

  return `${hoursAndMinutes}${xm ? ` ${xm}` : ''}`;
};
