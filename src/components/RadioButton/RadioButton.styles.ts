import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

export const Container = styled.div<{ $checked: boolean; $disabled?: boolean; $forceTheme?: ThemeMode }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${(props) => getThemedColor('var(--border-tertiary)', props.$forceTheme)};
  border-radius: 12px;
  box-sizing: border-box;
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
  background: ${(props) =>
    props.$checked ? getThemedColor('var(--bg-overlay-tertiary)', props.$forceTheme) : 'transparent'};
`;

export const LabelAndDescription = styled.div`
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
