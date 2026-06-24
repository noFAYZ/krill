import styled from 'styled-components';

export const LargeItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  width: 100%;
`;

export const ImportClientIcon = styled.div`
  aspect-ratio: 1;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  place-items: center;

  width: 42px;
  height: 42px;

  border-radius: 8px;
  background: var(--bg-l3-solid);
  border: 1px solid var(--border-secondary);
`;

export const Textbox = styled.div`
  width: 100%;
  gap: 2px;
  display: flex;
  flex-direction: column;
`;
