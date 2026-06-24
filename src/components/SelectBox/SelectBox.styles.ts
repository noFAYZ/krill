import styled from 'styled-components';

export const BORDER_RADIUS = 12;

export const SvgContainer = styled.div<{
  $large: boolean;
  $checked: boolean;
  $position: string;
  $bgColor?: string;
}>`
  height: ${(props) => (props.$large ? 184 : 154)}px;
  position: relative;
  width: 100%;
  overflow: hidden;
  box-shadow: var(--shadow-l1);
  cursor: pointer;
  background-repeat: no-repeat;
  border-radius: ${BORDER_RADIUS}px;
  border: 1px solid ${(props) => (props.$checked ? 'var(--border-active)' : 'var(--border-secondary)')};
  background-position: ${(props) => props.$position};
  background-color: ${(props) => props.$bgColor};

  :hover {
    box-shadow: ${(props) => (props.$checked ? 'var(--shadow-l1)' : 'var(--shadow-l2)')};
  }
`;

export const LabelContainer = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

export const RadioContainer = styled.div`
  height: 100%;
  display: flex;
  position: relative;
`;

export const IllustrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
`;

export const ContentContainer = styled.div`
  z-index: 1;
  position: relative;
`;

export const RadioPosition = styled.div`
  position: absolute;
  top: 80px;
  left: 14px;
`;
