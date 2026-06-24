import styled from 'styled-components';

const CIRCLE_SIZE = 24;
const CONNECTOR_HEIGHT = 2;

export const StepsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

export const StepNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
  max-width: 120px;
`;

export const StepCircle = styled.div<{ $background: string; $border: string }>`
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: ${(props) => props.$background};
  border: 1.5px solid ${(props) => props.$border};
`;

export const StepConnector = styled.div<{ $background: string }>`
  flex: 1;
  min-width: 24px;
  height: ${CONNECTOR_HEIGHT}px;
  margin-top: ${CIRCLE_SIZE / 2 - CONNECTOR_HEIGHT / 2}px;
  background: ${(props) => props.$background};
`;
