import { motion } from 'framer-motion';
import * as React from 'react';

import Checkbox from '../Checkbox';
import Icons, { Icon } from '../Icons';
import Typography, { TypographySize, TypographyWeight } from '../Typography';

import { Body, Cell, CheckboxCell, HeaderRow, Row, TableContainer } from './Table.styles';
import { TableColumn, TableProps } from './Table.types';

function Table<RowData>({
  className,
  columns,
  dataTest,
  forceTheme,
  getRowKey,
  maxHeight,
  onSelectedKeysChange,
  onSortChange,
  rows,
  selectable,
  selectedKeys = [],
  sortDirection,
  sortKey
}: TableProps<RowData>) {
  const allKeys = rows.map((row, index) => getRowKey(row, index));
  const allSelected = allKeys.length > 0 && allKeys.every((key) => selectedKeys.includes(key));
  const someSelected = !allSelected && allKeys.some((key) => selectedKeys.includes(key));

  const toggleAll = () => onSelectedKeysChange?.(allSelected ? [] : allKeys);

  const toggleKey = (key: string) =>
    onSelectedKeysChange?.(selectedKeys.includes(key) ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key]);

  const renderHeaderLabel = (column: TableColumn<RowData>) => (
    <>
      <Typography color='disabled' forceTheme={forceTheme} size={TypographySize.SMALL} weight={TypographyWeight.MEDIUM}>
        {column.label}
      </Typography>
      {column.sortable && sortKey === column.key && (
        <motion.div
          animate={{ rotate: sortDirection === 'asc' ? 0 : 180 }}
          style={{ display: 'flex' }}
          transition={{ duration: 0.15 }}
        >
          <Icons color='disabled' forceTheme={forceTheme} icon={Icon.ChevronUp} size={16} />
        </motion.div>
      )}
    </>
  );

  return (
    <TableContainer className={className} data-test={dataTest}>
      <HeaderRow>
        {selectable && (
          <CheckboxCell>
            <Checkbox checked={allSelected} forceTheme={forceTheme} indeterminate={someSelected} onClick={toggleAll} />
          </CheckboxCell>
        )}
        {columns.map((column) => (
          <Cell
            $width={column.width}
            key={column.key}
            onClick={column.sortable ? () => onSortChange?.(column.key) : undefined}
            style={{ cursor: column.sortable ? 'pointer' : undefined, gap: 4 }}
          >
            {renderHeaderLabel(column)}
          </Cell>
        ))}
      </HeaderRow>
      <Body $maxHeight={maxHeight}>
        {rows.map((row, rowIndex) => {
          const rowKey = getRowKey(row, rowIndex);
          return (
            <Row $selected={selectedKeys.includes(rowKey)} key={rowKey}>
              {selectable && (
                <CheckboxCell>
                  <Checkbox
                    checked={selectedKeys.includes(rowKey)}
                    forceTheme={forceTheme}
                    onClick={() => toggleKey(rowKey)}
                  />
                </CheckboxCell>
              )}
              {columns.map((column) => (
                <Cell $width={column.width} key={column.key}>
                  {column.render(row, rowIndex)}
                </Cell>
              ))}
            </Row>
          );
        })}
      </Body>
    </TableContainer>
  );
}

export default Table;
