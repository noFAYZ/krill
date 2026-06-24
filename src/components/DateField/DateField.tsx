import * as React from 'react';
import { isMobile } from 'react-device-detect';

import { Icon } from '../Icons';

import { DateFieldContainer } from './DateField.styles';
import { DateFieldProps } from './DateField.types';
import DateInputField from './DateInputField';
import MobileDateInputField from './MobileDateInputField';

const DATE_FIELD_ID = 'dateField';

const DateField: React.FC<DateFieldProps> = ({
  onSelectDate,
  date,
  dateFormat = 'MM/DD/YYYY',
  error,
  forceTheme,
  isReadOnly = false,
  minDate,
  showIcon,
  width
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const startIcon = showIcon ? Icon.Calendar : undefined;

  return (
    <DateFieldContainer $width={width}>
      {isMobile ? (
        <MobileDateInputField
          dateFormat={dateFormat}
          date={date}
          error={error}
          forceTheme={forceTheme}
          id={DATE_FIELD_ID}
          isDatePickerOpen={isDatePickerOpen}
          isReadOnly={isReadOnly}
          minDate={minDate}
          setIsDatePickerOpen={setIsDatePickerOpen}
          startIcon={startIcon}
          onSelectDate={onSelectDate}
        />
      ) : (
        <DateInputField
          dateFormat={dateFormat}
          date={date}
          error={error}
          forceTheme={forceTheme}
          id={DATE_FIELD_ID}
          isDatePickerOpen={isDatePickerOpen}
          isReadOnly={isReadOnly}
          minDate={minDate}
          setIsDatePickerOpen={setIsDatePickerOpen}
          startIcon={startIcon}
          onSelectDate={onSelectDate}
        />
      )}
    </DateFieldContainer>
  );
};

export default DateField;
