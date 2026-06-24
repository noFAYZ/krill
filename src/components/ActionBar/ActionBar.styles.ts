import { motion } from 'framer-motion';
import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

export const Container = styled(motion.div)<{ $zIndex?: number }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: ${(props) => props.$zIndex ?? 1300};
`;

export const Bar = styled.div<{ $forceTheme?: ThemeMode }>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 4px;
  padding: 8px;
  padding-bottom: max(8px, env(safe-area-inset-bottom));
  box-sizing: border-box;
  background: ${(props) => getThemedColor('var(--bg-l3-solid)', props.$forceTheme)};
  box-shadow: 0px -1px 0px ${(props) => getThemedColor('var(--border-secondary)', props.$forceTheme)},
    ${(props) => getThemedColor('var(--shadow-l2)', props.$forceTheme)};
`;
