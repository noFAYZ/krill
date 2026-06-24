import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

import {
  Button,
  DateDisplay,
  DateField,
  DatePicker,
  DateRangePicker,
  HourPicker,
  TimeField,
  TimeZonePicker
} from '../../src';
import { ComponentDoc } from '../types';

const DateDisplayDoc: ComponentDoc = {
  slug: 'date-display',
  title: 'DateDisplay',
  category: 'Date & time',
  description: 'Renders a date as relative ("3 hours ago") or absolute text, and keeps relative timestamps live.',
  importStatement: "import { DateDisplay } from 'krill';",
  examples: [
    {
      title: 'Relative and absolute',
      code: `<DateDisplay value={new Date()} type="relative" />
<DateDisplay value={new Date()} type="absolute" />`,
      Component: () => (
        <>
          <DateDisplay type='relative' value={new Date()} />
          <DateDisplay type='absolute' value={new Date()} />
        </>
      )
    }
  ],
  props: [
    { name: 'value', type: 'string | number | Date | Dayjs', description: 'The date to display.', required: true },
    { name: 'type', type: "'relative' | 'absolute'", description: 'Display mode.', default: "'relative'" },
    {
      name: 'dateFormat',
      type: 'string',
      description: 'dayjs format string for the date portion in absolute mode.',
      default: "'MMM D, YYYY'"
    },
    {
      name: 'hourFormat',
      type: "'12' | '24'",
      description: 'Clock format for the time portion in absolute mode.',
      default: "'12'"
    }
  ]
};

const DateFieldDoc: ComponentDoc = {
  slug: 'date-field',
  title: 'DateField',
  category: 'Date & time',
  description: 'A text field that opens a calendar dropdown (desktop) or drawer (mobile) for picking a date.',
  importStatement: "import { DateField } from 'krill';",
  examples: [
    {
      title: 'Controlled date field',
      code: `const [date, setDate] = useState<Dayjs | undefined>(dayjs());
<DateField date={date} showIcon onSelectDate={(d) => setDate(d ? dayjs(d as Date) : undefined)} />`,
      Component: () => {
        const [date, setDate] = React.useState<Dayjs | undefined>(dayjs());
        return <DateField date={date} showIcon onSelectDate={(d) => setDate(d ? dayjs(d as Date) : undefined)} />;
      }
    }
  ],
  props: [
    {
      name: 'onSelectDate',
      type: '(date: Date | null) => void',
      description: 'Called when a date is picked.',
      required: true
    },
    { name: 'date', type: 'Dayjs', description: 'Controlled value.' },
    {
      name: 'dateFormat',
      type: 'string',
      description: 'dayjs format string for the input display.',
      default: "'MM/DD/YYYY'"
    },
    { name: 'showIcon', type: 'boolean', description: 'Shows a calendar icon at the start of the field.' },
    { name: 'minDate', type: 'Date', description: 'The earliest selectable date.' },
    { name: 'isReadOnly', type: 'boolean', description: 'Disables editing.' }
  ]
};

const DatePickerDoc: ComponentDoc = {
  slug: 'date-picker',
  title: 'DatePicker',
  category: 'Date & time',
  description:
    'A standalone calendar grid, the same one DateField opens in a dropdown. Supports an optional colored event-dot overlay per day.',
  importStatement: "import { DatePicker } from 'krill';",
  examples: [
    {
      title: 'Controlled calendar',
      code: `const [date, setDate] = useState<Dayjs | undefined>(dayjs());
<DatePicker selectedDate={date} onSelectDate={(d) => setDate(d ? dayjs(d as Date) : undefined)} />`,
      Component: () => {
        const [date, setDate] = React.useState<Dayjs | undefined>(dayjs());
        return <DatePicker selectedDate={date} onSelectDate={(d) => setDate(d ? dayjs(d as Date) : undefined)} />;
      }
    }
  ],
  props: [
    {
      name: 'onSelectDate',
      type: '(date: Date | null) => void',
      description: 'Called when a day is clicked.',
      required: true
    },
    { name: 'selectedDate', type: 'Dayjs', description: 'Controlled value.' },
    { name: 'minDate', type: 'Date', description: 'The earliest selectable date.' },
    {
      name: 'events',
      type: '{ date: Dayjs; colors: string[] }[]',
      description: 'Renders colored dots under days that have events.'
    },
    {
      name: 'showHeader',
      type: 'boolean',
      description: 'Shows the month/year header with prev/next arrows.',
      default: 'true'
    }
  ]
};

const DateRangePickerDoc: ComponentDoc = {
  slug: 'date-range-picker',
  title: 'DateRangePicker',
  category: 'Date & time',
  description:
    'A calendar grid for picking a start/end date range. Click a day to set the start, click again to set the end.',
  importStatement: "import { DateRangePicker } from 'krill';",
  examples: [
    {
      title: 'Controlled range',
      code: `const [range, setRange] = useState<DateRange>({ start: dayjs(), end: null });
<DateRangePicker selectedRange={range} onSelectRange={setRange} />`,
      Component: () => {
        const [range, setRange] = React.useState<{ start: Dayjs | null; end: Dayjs | null }>({
          start: dayjs(),
          end: null
        });
        return <DateRangePicker selectedRange={range} onSelectRange={setRange} />;
      }
    }
  ],
  props: [
    {
      name: 'onSelectRange',
      type: '(range: DateRange) => void',
      description: 'Called when the start or end of the range is picked.',
      required: true
    },
    {
      name: 'selectedRange',
      type: 'DateRange',
      description: 'Controlled value: `{ start: Dayjs | null; end: Dayjs | null }`.'
    },
    { name: 'minDate', type: 'Date', description: 'The earliest selectable date.' },
    {
      name: 'showHeader',
      type: 'boolean',
      description: 'Shows the month/year header with prev/next arrows.',
      default: 'true'
    }
  ]
};

const TimeFieldDoc: ComponentDoc = {
  slug: 'time-field',
  title: 'TimeField',
  category: 'Date & time',
  description:
    'A text field that opens a time-list dropdown (desktop) or a scrollable hour-wheel drawer (mobile, via HourPicker).',
  importStatement: "import { TimeField } from 'krill';",
  examples: [
    {
      title: 'Controlled time field',
      code: `const [time, setTime] = useState<Dayjs | undefined>(dayjs());
<TimeField
  date={time}
  showIcon
  onSelectTime={(t) => setTime(typeof t === 'string' ? dayjs(t, 'h:mm A') : t)}
/>`,
      Component: () => {
        const [time, setTime] = React.useState<Dayjs | undefined>(dayjs());
        return (
          <TimeField
            date={time}
            showIcon
            onSelectTime={(t) => setTime(typeof t === 'string' ? dayjs(t, 'h:mm A') : t)}
          />
        );
      }
    }
  ],
  props: [
    {
      name: 'onSelectTime',
      type: '(time: Dayjs | string) => void',
      description: 'Called when a time is picked or typed.',
      required: true
    },
    { name: 'date', type: 'Dayjs', description: 'Controlled value.' },
    { name: 'hourFormat', type: "'12' | '24'", description: 'Clock format.', default: "'12'" },
    {
      name: 'minuteInterval',
      type: 'number',
      description: 'Minute increment shown in the time list / hour wheel.',
      default: '15'
    },
    { name: 'showIcon', type: 'boolean', description: 'Shows a clock icon at the start of the field.' }
  ]
};

const TimeZonePickerDoc: ComponentDoc = {
  slug: 'time-zone-picker',
  title: 'TimeZonePicker',
  category: 'Date & time',
  description:
    'A searchable dropdown of IANA time zones, each shown with its current UTC offset and a representative city.',
  importStatement: "import { TimeZonePicker } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [open, setOpen] = useState(false);
const [tz, setTz] = useState('America/Los_Angeles');

<Button onClick={() => setOpen(true)}>{tz}</Button>
<TimeZonePicker buttonRef={buttonRef} isOpen={open} timeZone={tz} setIsOpen={setOpen} onSelectTimeZone={setTz} />`,
      Component: () => {
        const buttonRef = React.useRef<HTMLDivElement>(null);
        const [open, setOpen] = React.useState(false);
        const [tz, setTz] = React.useState('America/Los_Angeles');
        return (
          <>
            <div ref={buttonRef}>
              <Button onClick={() => setOpen(true)}>{tz}</Button>
            </div>
            <TimeZonePicker
              buttonRef={buttonRef}
              isOpen={open}
              setIsOpen={setOpen}
              timeZone={tz}
              onSelectTimeZone={setTz}
            />
          </>
        );
      }
    }
  ],
  props: [
    {
      name: 'buttonRef',
      type: 'MutableRefObject<HTMLDivElement | null>',
      description: 'Anchor element ref.',
      required: true
    },
    { name: 'isOpen', type: 'boolean', description: 'Opened / closed state.', required: true },
    { name: 'timeZone', type: 'string', description: 'Currently selected IANA time zone name.', required: true },
    {
      name: 'setIsOpen',
      type: 'Dispatch<SetStateAction<boolean>>',
      description: 'Updates the open state.',
      required: true
    },
    {
      name: 'onSelectTimeZone',
      type: '(tzName: string) => void',
      description: 'Called when a time zone is selected.',
      required: true
    },
    { name: 'fixedHeight', type: 'boolean', description: "Locks the dropdown's scroll area to a fixed height." }
  ]
};

const HourPickerDoc: ComponentDoc = {
  slug: 'hour-picker',
  title: 'HourPicker',
  category: 'Date & time',
  description: 'A scrollable hour/minute (and AM/PM) wheel picker, used by TimeField on mobile.',
  importStatement: "import { HourPicker } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<HourPicker itemHeight={40} timeFormat="h:mm A" onChange={() => {}} />`,
      Component: () => <HourPicker itemHeight={40} timeFormat='h:mm A' onChange={() => {}} />
    }
  ],
  props: [
    { name: 'itemHeight', type: 'number', description: 'Height of each scrollable item, in pixels.', required: true },
    {
      name: 'onChange',
      type: '(value: string) => void',
      description: 'Called as the wheels settle on a new value.',
      required: true
    },
    {
      name: 'timeFormat',
      type: "'h' | 'H' | 'h A' | 'h:mm A' | 'H:mm' | 'HH:mm'",
      description: 'Determines whether an AM/PM wheel is shown.',
      required: true
    },
    { name: 'initialHour', type: 'Dayjs | null', description: 'Initial wheel position.' },
    { name: 'minuteInterval', type: 'number', description: 'Minute increment shown in the minute wheel.', default: '1' }
  ]
};

export const DATE_TIME_DOCS: ComponentDoc[] = [
  DateDisplayDoc,
  DateFieldDoc,
  DatePickerDoc,
  DateRangePickerDoc,
  TimeFieldDoc,
  TimeZonePickerDoc,
  HourPickerDoc
];
