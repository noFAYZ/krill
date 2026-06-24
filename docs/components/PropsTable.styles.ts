import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

export const HeaderRow = styled.tr`
  border-bottom: 1px solid var(--border-secondary);
`;

export const HeaderCell = styled.th`
  text-align: left;
  padding: 8px 12px;
  white-space: nowrap;
`;

export const Row = styled.tr`
  border-bottom: 1px solid var(--border-tertiary);
`;

export const Cell = styled.td`
  padding: 8px 12px;
  vertical-align: top;
`;

export const NameCell = styled(Cell)`
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  white-space: nowrap;
`;

export const TypeCell = styled(Cell)`
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  color: var(--text-secondary);
`;
