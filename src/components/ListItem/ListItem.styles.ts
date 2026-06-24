import { motion } from 'framer-motion';
import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

export const ActionsContainer = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 4px;
  opacity: ${(props) => (props.$active ? 1 : 0)};
  transition: opacity 0.15s ease;
`;

export const Container = styled(motion.div)<{ $active?: boolean; $disabled?: boolean; $forceTheme?: ThemeMode }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  box-sizing: border-box;
  background: ${(props) =>
    props.$active ? getThemedColor('var(--bg-overlay-tertiary)', props.$forceTheme) : 'transparent'};
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
  transition: background 0.15s ease;

  ${(props) =>
    !props.$disabled &&
    `
    &:hover {
      background: ${getThemedColor('var(--bg-overlay-tertiary)', props.$forceTheme)};
    }
    &:hover ${ActionsContainer} {
      opacity: 1;
    }
  `}
`;

export const Leading = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const Trailing = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
`;

export const UnreadDot = styled.div<{ $forceTheme?: ThemeMode }>`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: ${(props) => getThemedColor('var(--icon-link)', props.$forceTheme)};
`;
