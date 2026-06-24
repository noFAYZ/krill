import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enUS as locale } from 'date-fns/locale/en-US';
import dayjs from 'dayjs';
import * as React from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

import { Size, ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';
import Icons, { Icon } from '../Icons';
import { TYPOGRAPHY_MEDIUM_CSS } from '../Typography';

import { FIXED_NUMBER_OF_WEEKS, HEADER_MARGIN_BOTTOM } from './DateRangePicker.constants';
import { DateRangePickerProps } from './DateRangePicker.types';
import DateRangePickerDay from './DateRangePickerDay';

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

const CustomArrowIcon = ({ icon, forceTheme }: { icon: Icon; forceTheme?: ThemeMode }) => (
  <Icons color='secondary' forceTheme={forceTheme} icon={icon} size={Size.SMALL} />
);

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onSelectRange,
  className,
  forceTheme,
  minDate,
  selectedRange,
  showHeader = true
}) => {
  const onChange = (date: Date | null) => {
    if (!date) return;
    const clicked = dayjs(date);
    const { start, end } = selectedRange ?? { start: null, end: null };

    // First click, a fresh range after one was already completed, or clicking before the current
    // start all restart the range; otherwise this click completes it.
    if (!start || (start && end) || clicked.isBefore(start, 'day')) {
      onSelectRange({ start: clicked, end: null });
    } else {
      onSelectRange({ start, end: clicked });
    }
  };

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
          day: { range: selectedRange, forceTheme } as never,
          leftArrowIcon: { icon: Icon.Backward, forceTheme } as never,
          rightArrowIcon: { icon: Icon.Forward, forceTheme } as never
        }}
        slots={{
          day: DateRangePickerDay as never,
          leftArrowIcon: CustomArrowIcon,
          rightArrowIcon: CustomArrowIcon
        }}
        value={null}
        views={['day']}
        onChange={onChange}
        $forceTheme={forceTheme}
        $showHeader={showHeader}
      />
    </LocalizationProvider>
  );
};

export default DateRangePicker;
