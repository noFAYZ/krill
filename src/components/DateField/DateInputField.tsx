import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

import { useOnClickOutside } from '../../hooks';
import { Size, ThemeMode } from '../../types';
import DatePicker from '../DatePicker';
import Dropdown from '../Dropdown';
import { Icon } from '../Icons';
import { InputField } from '../InputField';

export const DATE_PICKER_DROPDOWN_CLASSNAME = 'date-picker-dropdown';

interface DateInputFieldProps {
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

// Renders the Date InputField for desktop as well as controls the DatePicker dropdown
const DateInputField: React.FC<DateInputFieldProps> = ({
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
  const inputRef = React.useRef<HTMLDivElement>(null);
  const inputInnerRef = React.useRef<HTMLInputElement>(null);

  const [customDateInput, setCustomDateInput] = React.useState<string | undefined>(undefined);
  const [isEditing, setIsEditing] = React.useState(false);

  const inputValue = customDateInput ?? (date ? date.format(dateFormat) : '');

  const resetValues = () => {
    setCustomDateInput(undefined);
    setIsEditing(false);
  };

  // Submit the user-inputted date by converting the date string to a Date object
  const onSubmitCustomDate = () => {
    if (!customDateInput) {
      setIsDatePickerOpen(false);
      resetValues();
      return;
    }

    const trimmedCustomDate = customDateInput.trim();
    const dateInDisplayFormat = dayjs(trimmedCustomDate, dateFormat);

    const customDateObj = dateInDisplayFormat.isValid()
      ? dateInDisplayFormat
      : dateFormat.includes('Y')
      ? dayjs(trimmedCustomDate)
      : dayjs(trimmedCustomDate).set('year', date?.year() ?? dayjs().year());

    if (customDateObj.isValid()) onSelectDate(customDateObj.toDate());

    setIsDatePickerOpen(false);
    resetValues();
  };

  // Clicking outside should submit the inputted date; ignore clicks within the date picker dropdown
  useOnClickOutside(
    inputInnerRef,
    onSubmitCustomDate,
    [DATE_PICKER_DROPDOWN_CLASSNAME],
    {},
    [],
    customDateInput === undefined && !isDatePickerOpen
  );

  React.useEffect(() => {
    if (!isEditing) inputInnerRef.current?.blur();
  }, [isEditing]);

  return (
    <>
      <div ref={inputRef}>
        <InputField
          autoComplete='off'
          disabled={isReadOnly}
          error={error}
          forceTheme={forceTheme}
          icon={startIcon}
          id={id}
          innerRef={inputInnerRef}
          size={Size.SMALL}
          value={inputValue}
          onBlur={() => {
            // Opening the date picker blurs the input field, so refocus to avoid interrupting editing
            if (isDatePickerOpen || isEditing) inputInnerRef.current?.focus();
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCustomDateInput(e.target.value);
            setIsDatePickerOpen(false);
          }}
          // onFocus (not onClick) so tabbing into the field also opens the picker
          onFocus={() => {
            setIsDatePickerOpen(true);
            setIsEditing(true);
          }}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Tab') onSubmitCustomDate();
            else if (e.key === 'Escape') resetValues();
          }}
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') onSubmitCustomDate();
          }}
          placeholder={dateFormat}
        />
      </div>
      <Dropdown
        buttonRef={inputRef}
        className={DATE_PICKER_DROPDOWN_CLASSNAME}
        gapFromAnchor={4}
        portal
        setShowDropdown={setIsDatePickerOpen}
        showDropdown={isDatePickerOpen}
      >
        <DatePicker
          forceTheme={forceTheme}
          minDate={minDate}
          selectedDate={date}
          onSelectDate={(newDate) => {
            onSelectDate(newDate);
            setIsDatePickerOpen(false);
            resetValues();
          }}
        />
      </Dropdown>
    </>
  );
};

export default DateInputField;
