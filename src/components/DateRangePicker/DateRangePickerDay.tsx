import { PickerDay, PickerDayProps } from '@mui/x-date-pickers/PickerDay';
import dayjs from 'dayjs';
import * as React from 'react';
import styled, { css } from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

import { DateRange } from './DateRangePicker.types';

const CustomPickerDay = styled(PickerDay)<{ $forceTheme?: ThemeMode; $inRange?: boolean }>`
  &.MuiPickerDay-root {
    color: ${(props) => getThemedColor('var(--text-primary)', props.$forceTheme)};

    ${(props) =>
      props.$inRange &&
      css`
        border-radius: 0;
        background: ${getThemedColor('var(--cta-secondary-hover)', props.$forceTheme)};
      `}

    &.MuiPickerDay-today {
      border-color: ${(props) => getThemedColor('var(--cta-primary-default)', props.$forceTheme)};
    }

    &.Mui-selected {
      background: ${(props) => getThemedColor('var(--cta-primary-default)', props.$forceTheme)} !important;
    }

    &.Mui-disabled {
      color: ${(props) => getThemedColor('var(--text-disabled)', props.$forceTheme)} !important;
    }

    &:not(.Mui-selected):hover {
      background: ${(props) => getThemedColor('var(--cta-secondary-hover)', props.$forceTheme)};
    }
  }
`;

export interface DateRangePickerDayProps {
  forceTheme?: ThemeMode;
  range?: DateRange;
}

// The free DateCalendar only tracks a single `value`, so the start/end/in-range visuals here are
// computed by hand from `range` instead of relying on MUI's built-in `selected` day state.
const DateRangePickerDay: React.FC<PickerDayProps & DateRangePickerDayProps> = ({ forceTheme, range, ...other }) => {
  const day = dayjs(other.day as Date);
  const isStart = !!range?.start && day.isSame(range.start, 'day');
  const isEnd = !!range?.end && day.isSame(range.end, 'day');
  const inRange = !!range?.start && !!range?.end && day.isAfter(range.start, 'day') && day.isBefore(range.end, 'day');

  return <CustomPickerDay {...other} $forceTheme={forceTheme} $inRange={inRange} selected={isStart || isEnd} />;
};

export default DateRangePickerDay;
