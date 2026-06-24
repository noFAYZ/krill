import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

export const NumberInputContainer = styled.div<{ $disabled: boolean; $forceTheme?: ThemeMode }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
  border: 1px solid ${(props) => getThemedColor('var(--border-secondary)', props.$forceTheme)};
  border-radius: 8px;
  padding: 4px 8px;
`;

export const NumberInputValue = styled.div`
  min-width: 24px;
  text-align: center;
`;
