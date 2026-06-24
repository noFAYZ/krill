import * as React from 'react';
import { isMobile } from 'react-device-detect';

import { Icon } from '../Icons';

import { TimeFieldProps } from './TimeField.types';
import MobileTimeInputField from './MobileTimeInputField';
import TimeInputField from './TimeInputField';

const TIME_FIELD_ID = 'timeField';

const TimeField: React.FC<TimeFieldProps> = ({
  onSelectTime,
  date,
  error,
  forceTheme,
  hourFormat = '12',
  isReadOnly = false,
  minuteInterval = 15,
  showIcon
}) => {
  const [isTimePickerOpen, setIsTimePickerOpen] = React.useState(false);
  const startIcon = showIcon ? Icon.Clock : undefined;

  return isMobile ? (
    <MobileTimeInputField
      date={date}
      error={error}
      forceTheme={forceTheme}
      hourFormat={hourFormat}
      id={TIME_FIELD_ID}
      isReadOnly={isReadOnly}
      isTimePickerOpen={isTimePickerOpen}
      minuteInterval={minuteInterval}
      setIsTimePickerOpen={setIsTimePickerOpen}
      startIcon={startIcon}
      onSelectTime={onSelectTime}
    />
  ) : (
    <TimeInputField
      date={date}
      error={error}
      forceTheme={forceTheme}
      hourFormat={hourFormat}
      id={TIME_FIELD_ID}
      isReadOnly={isReadOnly}
      isTimePickerOpen={isTimePickerOpen}
      minuteInterval={minuteInterval}
      setIsTimePickerOpen={setIsTimePickerOpen}
      startIcon={startIcon}
      onSelectTime={onSelectTime}
    />
  );
};

export default TimeField;
