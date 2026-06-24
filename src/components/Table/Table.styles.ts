import styled from 'styled-components';

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-overlay-quaternary);
  border-bottom: 1px solid var(--border-secondary);
`;

export const Body = styled.div<{ $maxHeight?: number | string }>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ${(props) =>
    props.$maxHeight &&
    `max-height: ${typeof props.$maxHeight === 'string' ? props.$maxHeight : `${props.$maxHeight}px`};`}
`;

export const Row = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${(props) => (props.$selected ? 'var(--bg-overlay-quaternary)' : 'transparent')};
  transition: background 0.15s ease;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-secondary);
  }
  &:hover {
    background: var(--bg-overlay-tertiary);
  }
`;

export const Cell = styled.div<{ $width?: string }>`
  flex: ${(props) => props.$width ?? '1'};
  min-width: 0;
  display: flex;
  align-items: center;
`;

export const CheckboxCell = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;
