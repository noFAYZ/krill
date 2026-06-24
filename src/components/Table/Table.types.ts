import { ThemeMode } from '../../types';

export type TableSortDirection = 'asc' | 'desc';

export interface TableColumn<RowData> {
  /** Unique column key, also used as the sort key passed to onSortChange */
  key: string;
  label: string;
  render: (row: RowData, rowIndex: number) => React.ReactNode;
  sortable?: boolean;
  /** CSS flex value for the column, e.g. '1' or '120px'. Defaults to '1' */
  width?: string;
}

export interface TableProps<RowData> {
  columns: TableColumn<RowData>[];
  getRowKey: (row: RowData, index: number) => string;
  rows: RowData[];
  /** For styled components */
  className?: string;
  /** E2E test indicator */
  dataTest?: string;
  forceTheme?: ThemeMode;
  /** Caps the body's scroll height */
  maxHeight?: number | string;
  onSelectedKeysChange?: (keys: string[]) => void;
  onSortChange?: (key: string) => void;
  /** Adds a leading checkbox column; requires onSelectedKeysChange */
  selectable?: boolean;
  selectedKeys?: string[];
  sortDirection?: TableSortDirection;
  sortKey?: string;
}
