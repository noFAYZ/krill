import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { DISPLAY_SCROLLBAR_CSS } from '../../styles';

export const Container = styled.div<{ $width?: number | string; forceTheme?: ThemeMode }>`
  width: ${(props) => (typeof props.$width === 'number' ? `${props.$width}px` : props.$width ?? '240px')};
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
  ${DISPLAY_SCROLLBAR_CSS}
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SectionHeader = styled.div<{ $collapsible?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  ${(props) => props.$collapsible && 'cursor: pointer;'}
`;

export const EmptyLabel = styled.div`
  padding: 6px 8px;
`;

export const Footer = styled.div`
  margin-top: auto;
`;
