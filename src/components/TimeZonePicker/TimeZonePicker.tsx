import * as React from 'react';

import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';
import { InputField } from '../InputField';

import { TIME_ZONE_PICKER_WIDTH } from './TimeZonePicker.constants';
import { ScrollContainer } from './TimeZonePicker.styles';
import { TimeZonePickerProps } from './TimeZonePicker.types';
import { renderCustomLabel, stringifyTimeZone, timeZoneIncludesQuery, uniqueTimezones } from './TimeZonePicker.utils';

const TimeZonePicker: React.FC<TimeZonePickerProps> = ({
  buttonRef,
  isOpen,
  timeZone,
  onSelectTimeZone,
  setIsOpen,
  fixedHeight = false,
  ...dropdownProps
}) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [highlightedIdx, setHighlightedIdx] = React.useState<number>(0);

  const filteredTimeZones = React.useMemo(
    () =>
      uniqueTimezones.filter(
        (tz) =>
          timeZoneIncludesQuery(tz, searchValue) ||
          stringifyTimeZone(tz).toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue]
  );

  React.useEffect(() => {
    if (isOpen) {
      const activeIndex = uniqueTimezones.findIndex((tz) => tz.name === timeZone);
      if (activeIndex !== highlightedIdx) setHighlightedIdx(activeIndex);
    } else if (searchValue.length) {
      setSearchValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Dropdown
      buttonRef={buttonRef}
      inputField={<InputField value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />}
      keyboardNavControls={{
        idx: highlightedIdx,
        setIdx: setHighlightedIdx,
        numItems: filteredTimeZones.length
      }}
      portal
      setShowDropdown={setIsOpen}
      showDropdown={isOpen}
      width={TIME_ZONE_PICKER_WIDTH}
      {...dropdownProps}
    >
      <ScrollContainer $fixedHeight={fixedHeight}>
        {filteredTimeZones.map((tz, index) => (
          <DropdownItem
            active={timeZone === tz.name}
            customLabel={renderCustomLabel(tz)}
            highlight={highlightedIdx === index}
            key={tz.name}
            label={stringifyTimeZone(tz)}
            onClick={() => {
              onSelectTimeZone(tz.name);
              setIsOpen(false);
            }}
            onHover={() => setHighlightedIdx(index)}
          />
        ))}
      </ScrollContainer>
    </Dropdown>
  );
};

export default TimeZonePicker;
