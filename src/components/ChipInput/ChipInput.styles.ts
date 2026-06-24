import styled from 'styled-components';

export const Container = styled.div<{ $disabled?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  background: var(--bg-field-default);
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
`;

export const TrailingInput = styled.input`
  flex: 1;
  min-width: 80px;
  outline: none;
  border: none;
  background: transparent;
  color: var(--text-primary);
  caret-color: var(--icon-link);
  font-family: inherit;
  font-size: 15px;
  line-height: 130%;
`;

export const EditingInput = styled(TrailingInput)`
  flex: none;
  min-width: 0;
`;
