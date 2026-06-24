import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';
import * as React from 'react';
import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';
import EventDot from '../EventDot';

import { MAX_NUM_OF_EVENTS_DISPLAYED } from './DatePicker.constants';
import { DatePickerEvent } from './DatePicker.types';

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomPickersDay = styled(PickersDay)<{ $forceTheme?: ThemeMode }>`
  &.MuiPickersDay-root {
    color: ${(props) => getThemedColor('var(--text-primary)', props.$forceTheme)};

    &.MuiPickersDay-today {
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

const EventsDotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

export interface DatePickerDayProps {
  events?: DatePickerEvent[];
  forceTheme?: ThemeMode;
}

const DatePickerDay: React.FC<PickersDayProps<unknown> & DatePickerDayProps> = ({ events, forceTheme, ...other }) => {
  const dayEvents = events
    ?.find((event) => dayjs(event.date).isSame(other.day as Date, 'day'))
    ?.colors.slice(0, MAX_NUM_OF_EVENTS_DISPLAYED);

  return (
    <DayContainer>
      <CustomPickersDay {...other} $forceTheme={forceTheme} />
      {!!dayEvents?.length && (
        <EventsDotsContainer>
          {dayEvents.map((color, i) => (
            <EventDot color={color} key={i} />
          ))}
        </EventsDotsContainer>
      )}
    </DayContainer>
  );
};

export default DatePickerDay;
