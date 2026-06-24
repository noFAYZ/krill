import { Dayjs } from 'dayjs';
import * as React from 'react';

import { Size, ThemeMode } from '../../types';
import DatePicker from '../DatePicker';
import Drawer from '../Drawer';
import { Icon } from '../Icons';
import { InputField } from '../InputField';

interface MobileDateInputFieldProps {
  dateFormat: string;
  id: string;
  isDatePickerOpen: boolean;
  onSelectDate: (date: Date | null) => void;
  setIsDatePickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  date?: Dayjs;
  error?: boolean;
  forceTheme?: ThemeMode;
  isReadOnly?: boolean;
  minDate?: Date;
  startIcon?: Icon;
}

// Renders the Date InputField for mobile as well as controls the DatePicker drawer
const MobileDateInputField: React.FC<MobileDateInputFieldProps> = ({
  dateFormat,
  id,
  isDatePickerOpen,
  onSelectDate,
  setIsDatePickerOpen,
  date,
  error,
  forceTheme,
  isReadOnly = false,
  minDate,
  startIcon
}) => {
  const inputInnerRef = React.useRef<HTMLInputElement>(null);
  const inputValue = date ? date.format(dateFormat) : '';
  const closeDrawer = () => setIsDatePickerOpen(false);

  return (
    <>
      <InputField
        disabled={isReadOnly}
        error={error}
        forceTheme={forceTheme}
        icon={startIcon}
        id={id}
        innerRef={inputInnerRef}
        placeholder={dateFormat}
        readOnly
        size={Size.MEDIUM}
        value={inputValue}
        onClick={() => {
          if (!isReadOnly) setIsDatePickerOpen(true);
        }}
        // Prevents highlighting the input field text
        onFocus={() => inputInnerRef.current?.blur()}
      />
      <Drawer forceTheme={forceTheme} open={isDatePickerOpen} title='Select date' onClose={closeDrawer}>
        <DatePicker
          forceTheme={forceTheme}
          minDate={minDate}
          selectedDate={date}
          onSelectDate={(newDate) => {
            onSelectDate(newDate);
            closeDrawer();
          }}
        />
      </Drawer>
    </>
  );
};

export default MobileDateInputField;
