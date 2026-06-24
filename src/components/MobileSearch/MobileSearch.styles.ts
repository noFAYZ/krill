import styled from 'styled-components';

export const SearchContainer = styled.div<{ $showBorder?: boolean }>`
  padding: 16px 0px;
  border-bottom: ${(props) => (props.$showBorder ? '1px solid var(--border-tertiary)' : '')};

  display: flex;
  align-items: center;
  gap: 10px;
`;
