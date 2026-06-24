import styled from 'styled-components';

import { DISPLAY_SCROLLBAR_CSS } from '../../styles';

export const Container = styled.div`
  width: 100%;
`;

export const DividerContainer = styled.div`
  padding-top: 8px;
`;

export const ScrollContainer = styled.div`
  max-height: 180px;
  overflow-y: auto;
  ${DISPLAY_SCROLLBAR_CSS}
`;

export const EndAdornment = styled.div`
  display: flex;
`;
