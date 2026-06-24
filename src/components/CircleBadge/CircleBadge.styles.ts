import styled from 'styled-components';

export const Container = styled.div<{ $hideContainer?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.$hideContainer ? 20 : 27)}px;
  height: ${(props) => (props.$hideContainer ? 20 : 27)}px;
  border-radius: 6px;
  background: ${(props) => (props.$hideContainer ? '' : 'var(--bg-l3-solid)')};
  box-shadow: ${(props) => (props.$hideContainer ? '' : 'var(--shadow-l1)')};
  cursor: pointer;
  position: relative;
`;

export const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  border: 1px solid var(--border-secondary);
  box-sizing: border-box;
  background: var(--bg-overlay-tertiary);
  transform: translate(-50%, -50%);
`;

export const HorizontalLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--border-tertiary);
  transform: translateY(-50%);
`;

export const VerticalLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  background: var(--border-tertiary);
  transform: translateX(-50%);
`;
