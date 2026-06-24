export interface MobileSearchProps {
  setSearchQuery: (query: string) => void;
  disableCancelButton?: boolean;
  disabled?: boolean;
  initialValue?: string;
  onCancel?: () => void;
  placeHolder?: string;
  /** Changing this value clears the search, e.g. when the consumer navigates to a different view */
  resetKey?: string | number;
  showBorder?: boolean;
}
