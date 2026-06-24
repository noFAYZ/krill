import { Dayjs } from 'dayjs';
import range from 'lodash/range';
import * as React from 'react';

import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';

import { TimeFieldHourFormat } from './TimeField.types';
import { dateToFormatString } from './TimeField.utils';

const MAX_DROPDOWN_HEIGHT = 196;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

interface TimeFieldDropdownProps {
  isOpen: boolean;
  inputRef: React.RefObject<HTMLDivElement | null>;
  hourFormat: TimeFieldHourFormat;
  minuteInterval: number;
  onSubmitTime: (time: Dayjs | string | undefined) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  customTimeInput?: string;
  date?: Dayjs;
  gapFromAnchor?: number;
}

const TimeFieldDropdown: React.FC<TimeFieldDropdownProps> = ({
  isOpen,
  inputRef,
  hourFormat,
  minuteInterval,
  onSubmitTime,
  setIsOpen,
  className,
  customTimeInput,
  date,
  gapFromAnchor
}) => {
  // Avoid recalculating the time list on every render; only do so while the dropdown is shown
  const filteredTimeList = React.useMemo(() => {
    if (!isOpen || !date) return [];
    const startOfDay = date.startOf('day');
    const numIntervals = (HOURS_IN_DAY * MINUTES_IN_HOUR) / minuteInterval;
    const timeList = range(numIntervals).map((index) => startOfDay.add(index * minuteInterval, 'minute'));
    return customTimeInput
      ? timeList.filter((time) => dateToFormatString(time, hourFormat).includes(customTimeInput))
      : timeList;
  }, [isOpen, date, minuteInterval, customTimeInput, hourFormat]);

  return (
    <Dropdown
      buttonRef={inputRef}
      className={className}
      gapFromAnchor={gapFromAnchor}
      maxHeight={MAX_DROPDOWN_HEIGHT}
      portal
      setShowDropdown={setIsOpen}
      showDropdown={isOpen && !!filteredTimeList.length}
      width={210}
    >
      {filteredTimeList.map((time) => {
        const isActive = !!date && time.isSame(date);
        const formattedTime = dateToFormatString(time, hourFormat);
        return (
          <DropdownItem
            active={isActive}
            key={formattedTime}
            label={formattedTime}
            scrollIntoView={isActive}
            value={formattedTime}
            onClick={() => onSubmitTime(time)}
          />
        );
      })}
    </Dropdown>
  );
};

export default TimeFieldDropdown;
