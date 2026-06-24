import { Dayjs } from 'dayjs';
import * as React from 'react';

import { useOnClickOutside } from '../../hooks';
import { Size, ThemeMode } from '../../types';
import { Icon } from '../Icons';
import { InputField } from '../InputField';

import { TimeFieldHourFormat } from './TimeField.types';
import { dateToFormatString, HOUR_FORMAT_PATTERN, parseCustomTime } from './TimeField.utils';
import TimeFieldDropdown from './TimeFieldDropdown';

export const TIME_PICKER_DROPDOWN_CLASSNAME = 'time-picker-dropdown';

interface TimeInputFieldProps {
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

// Renders the Time InputField for desktop as well as controls the time list dropdown
const TimeInputField: React.FC<TimeInputFieldProps> = ({
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
  const inputRef = React.useRef<HTMLDivElement>(null);
  const inputInnerRef = React.useRef<HTMLInputElement>(null);

  const [customTimeInput, setCustomTimeInput] = React.useState<string | undefined>(undefined);
  const inputFieldValue = customTimeInput ?? (date ? dateToFormatString(date, hourFormat) : undefined);

  const onSubmitTime = (newTime: Dayjs | string | undefined) => {
    if (!newTime) {
      setIsTimePickerOpen(false);
      return;
    }

    const newSelectedTime = typeof newTime === 'string' ? parseCustomTime(newTime, hourFormat, date) : newTime;
    onSelectTime(newSelectedTime);
    setIsTimePickerOpen(false);
  };

  // Clicking outside should submit the inputted time; ignore clicks within the time picker dropdown
  useOnClickOutside(
    inputInnerRef,
    () => onSubmitTime(customTimeInput),
    [TIME_PICKER_DROPDOWN_CLASSNAME],
    {},
    [],
    customTimeInput === undefined && !isTimePickerOpen
  );

  React.useEffect(() => {
    if (!isTimePickerOpen) {
      inputInnerRef.current?.blur();
      setCustomTimeInput(undefined);
    }
  }, [isTimePickerOpen]);

  return (
    <>
      <div ref={inputRef}>
        <InputField
          disabled={isReadOnly}
          error={error}
          forceTheme={forceTheme}
          icon={startIcon}
          id={id}
          innerRef={inputInnerRef}
          placeholder={HOUR_FORMAT_PATTERN[hourFormat]}
          size={Size.SMALL}
          value={inputFieldValue}
          onBlur={() => {
            // Clicking the input while the dropdown is open blurs it via the dropdown's background
            // blocker, so refocus if the user was still editing
            if (isTimePickerOpen) inputInnerRef.current?.focus();
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomTimeInput(e.target.value)}
          // onFocus (not onClick) so tabbing into the field also opens the dropdown
          onFocus={() => setIsTimePickerOpen(true)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Tab') onSubmitTime(customTimeInput);
          }}
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') onSubmitTime(customTimeInput);
          }}
        />
      </div>
      <TimeFieldDropdown
        className={TIME_PICKER_DROPDOWN_CLASSNAME}
        customTimeInput={customTimeInput}
        date={date}
        hourFormat={hourFormat}
        inputRef={inputRef}
        isOpen={isTimePickerOpen}
        minuteInterval={minuteInterval}
        setIsOpen={setIsTimePickerOpen}
        onSubmitTime={onSubmitTime}
      />
    </>
  );
};

export default TimeInputField;
