import debounce from 'lodash/debounce';
import * as React from 'react';

import { ThemeMode } from '../../types';
import Typography, { TypographySize } from '../Typography';

import { Container, GradientBackground, HighlightedSection, ScrollContainer, ScrollItem } from './HourPicker.styles';
import { HourPickerProps } from './HourPicker.types';
import { getInitialDateObject } from './HourPicker.utils';

const TWELVE_HOUR_LIST = ['12', ...Array.from({ length: 11 }, (_, i) => String(i + 1))];
const TWENTY_FOUR_HOUR_LIST = Array.from({ length: 24 }, (_, i) => String(i));
const TIME_DIVIDERS = ['AM', 'PM'];

const getMinutes = (interval = 1) =>
  Array.from({ length: 60 / interval }, (_, i) => i * interval).map((n) => String(n).padStart(2, '0'));

/** Given the current item index and the currently selected index, decides which items get highlighted */
type CompareFunction = (i: number, currentSelectedIndex: number) => boolean;

const getInitialScrollIndex = (initialValue: string | undefined, scrollList: string[]) => {
  if (!initialValue || !scrollList.includes(initialValue)) return 0;
  return scrollList.indexOf(initialValue) + 1;
};

interface ScrollableSelectWheelProps {
  scrollList: string[];
  itemHeight: number;
  onChange: (value: string) => void;
  compareCbs?: CompareFunction[];
  forceTheme?: ThemeMode;
  initialValue?: string;
  paddingRight?: number;
}

const ScrollableSelectWheel: React.FC<ScrollableSelectWheelProps> = ({
  scrollList,
  itemHeight,
  onChange,
  compareCbs,
  forceTheme,
  initialValue,
  paddingRight
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(getInitialScrollIndex(initialValue, scrollList));

  React.useEffect(() => {
    if (!initialValue || !scrollList.includes(initialValue) || !scrollRef.current) return;
    const initialValueIndex = getInitialScrollIndex(initialValue, scrollList);
    scrollRef.current.scrollTop = initialValueIndex * itemHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue, itemHeight]);

  const onScroll = () => {
    if (!scrollRef.current) return;
    const newIndex = Math.floor(scrollRef.current.scrollTop / itemHeight - 0.5);
    if (currentIndex !== newIndex && newIndex >= 0 && newIndex < scrollList.length) {
      setCurrentIndex(newIndex);
      onChange(scrollList[newIndex]);
    }
  };

  const getColor = (i: number) => {
    if (!compareCbs) return 'disabled';
    return compareCbs.some((compareFunction) => compareFunction(i, currentIndex)) ? 'primary' : 'disabled';
  };

  return (
    <ScrollContainer $height={itemHeight} $rightPadding={paddingRight ?? 12} ref={scrollRef} onScroll={onScroll}>
      {scrollList.map((item, i) => (
        <ScrollItem $height={itemHeight} key={item}>
          <Typography color={getColor(i)} forceTheme={forceTheme} size={TypographySize.LARGE} transition='color 0.3s'>
            {item.padStart(2, '0')}
          </Typography>
        </ScrollItem>
      ))}
    </ScrollContainer>
  );
};

const HOUR_OR_MINUTE_COMPARE_FNS: CompareFunction[] = [
  (i, currentSelectedIndex) => currentSelectedIndex === i,
  (i, currentSelectedIndex) => currentSelectedIndex - 1 === i,
  (i, currentSelectedIndex) => currentSelectedIndex + 1 === i
];

const AMPM_COMPARE_FNS: CompareFunction[] = [(i, currentSelectedIndex) => currentSelectedIndex === i];

const HourPicker: React.FC<HourPickerProps> = ({
  itemHeight,
  onChange,
  initialHour,
  timeFormat,
  forceTheme,
  minuteInterval,
  onChangeDebounceInterval = 300
}) => {
  const is12HourFormat = timeFormat.includes('A');
  const [initialDateObject] = React.useState(() => getInitialDateObject(is12HourFormat, initialHour, timeFormat));
  const [hour, setHour] = React.useState<string | undefined>(initialDateObject.hour);
  const [minute, setMinute] = React.useState<string | undefined>(initialDateObject.minute);
  const [timeDivider, setTimeDivider] = React.useState<string | undefined>(initialDateObject.timeDivider);
  const minutes = React.useMemo(() => getMinutes(minuteInterval), [minuteInterval]);

  const debouncedOnChange = React.useMemo(
    () => debounce(onChange, onChangeDebounceInterval),
    [onChange, onChangeDebounceInterval]
  );

  React.useEffect(() => {
    if (!hour || !minute) return;
    if (is12HourFormat && timeDivider) debouncedOnChange(`${hour}:${minute} ${timeDivider}`);
    else if (!is12HourFormat) debouncedOnChange(`${hour}:${minute}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, is12HourFormat, minute, timeDivider]);

  const hourList = is12HourFormat ? TWELVE_HOUR_LIST : TWENTY_FOUR_HOUR_LIST;

  return (
    <Container $height={itemHeight}>
      <ScrollableSelectWheel
        compareCbs={HOUR_OR_MINUTE_COMPARE_FNS}
        forceTheme={forceTheme}
        initialValue={initialDateObject.hour}
        itemHeight={itemHeight}
        scrollList={hourList}
        onChange={setHour}
      />
      <ScrollableSelectWheel
        compareCbs={HOUR_OR_MINUTE_COMPARE_FNS}
        forceTheme={forceTheme}
        initialValue={initialDateObject.minute}
        itemHeight={itemHeight}
        paddingRight={20}
        scrollList={minutes}
        onChange={setMinute}
      />
      {is12HourFormat && (
        <ScrollableSelectWheel
          compareCbs={AMPM_COMPARE_FNS}
          forceTheme={forceTheme}
          initialValue={initialDateObject.timeDivider}
          itemHeight={itemHeight}
          paddingRight={20}
          scrollList={TIME_DIVIDERS}
          onChange={setTimeDivider}
        />
      )}
      <HighlightedSection $forceTheme={forceTheme} $height={itemHeight} />
      <GradientBackground $forceTheme={forceTheme} />
    </Container>
  );
};

export default HourPicker;
