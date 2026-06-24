import { Dispatch, SetStateAction } from 'react';

import { DropdownProps } from '../Dropdown';

type TimeZonePickerDropdownProps = Pick<DropdownProps, 'gapFromAnchor'>;

export interface TimeZonePickerProps extends TimeZonePickerDropdownProps {
  buttonRef: React.MutableRefObject<HTMLDivElement | null>;
  isOpen: boolean;
  timeZone: string;
  onSelectTimeZone: (tzName: string) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** Locks the dropdown's scroll area to a fixed height instead of shrinking to fit fewer results */
  fixedHeight?: boolean;
}
