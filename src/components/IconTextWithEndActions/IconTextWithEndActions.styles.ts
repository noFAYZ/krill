import styled from 'styled-components';

// Setting min-width to 0 keeps the flex box from overflowing
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0px;
`;

export const IconTextContainer = styled.div`
  min-width: 0px;
`;

export const StartActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0px;
`;

export const EndActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
