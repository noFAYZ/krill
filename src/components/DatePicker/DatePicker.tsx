import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import locale from 'date-fns/locale/en-US';
import { Dayjs } from 'dayjs';
import * as React from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

import { Size, ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';
import Icons, { Icon } from '../Icons';
import { TYPOGRAPHY_MEDIUM_CSS } from '../Typography';

import { FIXED_NUMBER_OF_WEEKS, HEADER_MARGIN_BOTTOM } from './DatePicker.constants';
import { DatePickerProps } from './DatePicker.types';
import DatePickerDay from './DatePickerDay';

const StyledDateCalendar = styled(DateCalendar)<{ $forceTheme?: ThemeMode; $showHeader: boolean }>`
  &.MuiDateCalendar-root {
    width: ${isMobile ? '100%' : '238px'};

    .MuiPickersCalendarHeader-root {
      display: ${(props) => (props.$showHeader ? 'flex' : 'none')};
      justify-content: space-between;
      align-items: center;
      margin: 0 0 ${HEADER_MARGIN_BOTTOM}px 0;
      padding: 0 2px 0 12px;
    }

    .MuiPickersCalendarHeader-label {
      color: ${(props) => getThemedColor('var(--text-primary)', props.$forceTheme)};
      cursor: auto;
      ${TYPOGRAPHY_MEDIUM_CSS}
    }

    .MuiDayCalendar-weekDayLabel {
      color: ${(props) => getThemedColor('var(--text-disabled)', props.$forceTheme)};
    }
  }
`;

const dayjsToDate = (date: Dayjs) => new Date(date.year(), date.month(), date.date());

const CustomArrowIcon = ({ icon, forceTheme }: { icon: Icon; forceTheme?: ThemeMode }) => (
  <Icons color='secondary' forceTheme={forceTheme} icon={icon} size={Size.SMALL} />
);

const DatePicker: React.FC<DatePickerProps> = ({
  onSelectDate,
  className,
  events,
  forceTheme,
  minDate,
  selectedDate,
  showHeader = true
}) => {
  const selectedDateValue = selectedDate ? dayjsToDate(selectedDate) : null;

  return (
    <LocalizationProvider adapterLocale={locale} dateAdapter={AdapterDateFns}>
      <StyledDateCalendar
        className={className}
        fixedWeekNumber={FIXED_NUMBER_OF_WEEKS}
        focusedView={null}
        minDate={minDate}
        reduceAnimations
        showDaysOutsideCurrentMonth
        slotProps={{
          day: { events, forceTheme } as never,
          leftArrowIcon: { icon: Icon.Backward, forceTheme } as never,
          rightArrowIcon: { icon: Icon.Forward, forceTheme } as never
        }}
        slots={{
          day: DatePickerDay as never,
          leftArrowIcon: CustomArrowIcon,
          rightArrowIcon: CustomArrowIcon
        }}
        value={selectedDateValue}
        views={['day']}
        onChange={onSelectDate}
        $forceTheme={forceTheme}
        $showHeader={showHeader}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
