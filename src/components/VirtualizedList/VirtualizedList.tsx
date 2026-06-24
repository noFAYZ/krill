import * as React from 'react';
import { ListChildComponentProps } from 'react-window';

import { EmptyStateContainer, StyledList } from './VirtualizedList.styles';
import { VirtualizedListProps } from './VirtualizedList.types';

/** Windowed list rendering, for lists too large to render in full (e.g. a 10k+ row inbox). */
function VirtualizedList<T>({
  items,
  itemHeight,
  height,
  renderItem,
  className,
  emptyState,
  getItemKey,
  overscanCount = 4,
  width = '100%'
}: VirtualizedListProps<T>) {
  if (items.length === 0) {
    return emptyState ? <EmptyStateContainer $height={height}>{emptyState}</EmptyStateContainer> : null;
  }

  const Row = ({ index, style }: ListChildComponentProps) => <div style={style}>{renderItem(items[index], index)}</div>;

  return (
    <StyledList
      className={className}
      height={height}
      itemCount={items.length}
      itemKey={getItemKey ? (index: number) => getItemKey(items[index], index) : undefined}
      itemSize={itemHeight}
      overscanCount={overscanCount}
      width={width}
    >
      {Row}
    </StyledList>
  );
}

export default VirtualizedList;
