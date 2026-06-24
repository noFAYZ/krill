import styled from 'styled-components';

import { REMOVE_SCROLLBAR_CSS } from '../../styles';

import { TIME_ZONE_PICKER_MAX_HEIGHT } from './TimeZonePicker.constants';

export const ScrollContainer = styled.div<{ $fixedHeight: boolean }>`
  width: 100%;
  overflow-y: auto;
  max-height: ${TIME_ZONE_PICKER_MAX_HEIGHT}px;
  ${(props) => props.$fixedHeight && `height: ${TIME_ZONE_PICKER_MAX_HEIGHT}px;`}
  ${REMOVE_SCROLLBAR_CSS}
`;
