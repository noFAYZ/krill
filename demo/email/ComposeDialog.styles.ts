import styled from 'styled-components';

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%
`;

export const SendRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const FromRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CcBccToggle = styled.div`
  width: fit-content;
  cursor: pointer;
`;

export const AttachmentsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AttachmentChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 8px;
  background: var(--bg-overlay-tertiary);
  border: 1px solid var(--border-tertiary);
  box-sizing: border-box;
`;
