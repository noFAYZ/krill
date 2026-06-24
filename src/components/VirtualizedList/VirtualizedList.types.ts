export interface VirtualizedListProps<T> {
  items: T[];
  /** Fixed height of each row, in pixels */
  itemHeight: number;
  /** Visible height of the list, in pixels */
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  /** For styled components */
  className?: string;
  /** Content shown when items is empty */
  emptyState?: React.ReactNode;
  /** Returns a unique key per item. Defaults to react-window's own index-based key */
  getItemKey?: (item: T, index: number) => string;
  /** Rows rendered outside the visible window, for smoother fast-scrolling. Defaults to 4 */
  overscanCount?: number;
  width?: number | string;
}
