import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

import { DISPLAY_SCROLLBAR_CSS } from '../../styles';

export const StyledList = styled(FixedSizeList)`
  ${DISPLAY_SCROLLBAR_CSS}
`;

export const EmptyStateContainer = styled.div<{ $height: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.$height}px;
`;
