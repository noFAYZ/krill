import styled from 'styled-components';

export const FullScreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const BrowserContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  min-height: 0;
   background: var(--bg-l3-solid)
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 9999;
`;
