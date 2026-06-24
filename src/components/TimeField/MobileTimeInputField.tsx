import { Dayjs } from 'dayjs';
import * as React from 'react';

import { Size, ThemeMode } from '../../types';
import Drawer from '../Drawer';
import HourPicker from '../HourPicker';
import { Icon } from '../Icons';
import { InputField } from '../InputField';

import { TimeFieldHourFormat } from './TimeField.types';
import { dateToFormatString, HOUR_FORMAT_PATTERN } from './TimeField.utils';

const HOUR_PICKER_ITEM_HEIGHT = 48;

interface MobileTimeInputFieldProps {
  id: string;
  isTimePickerOpen: boolean;
  hourFormat: TimeFieldHourFormat;
  minuteInterval: number;
  onSelectTime: (time: Dayjs | string) => void;
  setIsTimePickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  date?: Dayjs;
  error?: boolean;
  forceTheme?: ThemeMode;
  isReadOnly?: boolean;
  startIcon?: Icon;
}

// Renders the Time InputField for mobile as well as controls the TimePicker drawer
const MobileTimeInputField: React.FC<MobileTimeInputFieldProps> = ({
  id,
  isTimePickerOpen,
  hourFormat,
  minuteInterval,
  onSelectTime,
  setIsTimePickerOpen,
  date,
  error,
  forceTheme,
  isReadOnly = false,
  startIcon
}) => {
  const inputInnerRef = React.useRef<HTMLInputElement>(null);
  const inputFieldValue = date ? dateToFormatString(date, hourFormat) : undefined;
  const closeDrawer = () => setIsTimePickerOpen(false);

  return (
    <>
      <InputField
        disabled={isReadOnly}
        error={error}
        forceTheme={forceTheme}
        icon={startIcon}
        id={id}
        innerRef={inputInnerRef}
        placeholder={HOUR_FORMAT_PATTERN[hourFormat]}
        readOnly
        size={Size.MEDIUM}
        value={inputFieldValue}
        onClick={() => {
          if (!isReadOnly) setIsTimePickerOpen(true);
        }}
        // Prevents highlighting the input field text
        onFocus={() => inputInnerRef.current?.blur()}
      />
      <Drawer forceTheme={forceTheme} open={isTimePickerOpen} title='Select time' onClose={closeDrawer}>
        <HourPicker
          forceTheme={forceTheme}
          initialHour={date}
          itemHeight={HOUR_PICKER_ITEM_HEIGHT}
          minuteInterval={minuteInterval}
          timeFormat={HOUR_FORMAT_PATTERN[hourFormat] as 'h:mm A' | 'HH:mm'}
          onChange={onSelectTime}
        />
      </Drawer>
    </>
  );
};

export default MobileTimeInputField;
