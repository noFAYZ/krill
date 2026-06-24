import { RefObject } from 'react';

export interface FilterSelectProps {
  open: boolean;
  buttonRef: RefObject<HTMLDivElement> | undefined;
  filterLabels: string[];
  clearAllFilters: () => void;
  isFilterActive: (filter: string) => boolean;
  onClose: () => void;
  onSelectFilter: (filter: string) => void;
  minWidth?: number | string;
  numActiveFilters?: number;
}
