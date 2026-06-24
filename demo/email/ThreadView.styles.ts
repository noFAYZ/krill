import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

// Mirrors skemail-web's ThreadHeader: min-height 56px, padding 15px 16px, bottom border
export const Header = styled.div`
  min-height: 56px;
  box-sizing: border-box;
  padding: 15px 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--border-tertiary);
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 4px;
  flex-shrink: 0;
`;

export const SenderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  box-sizing: border-box;
`;

export const SenderInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const EmailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

// Mirrors skemail-web's ThreadBody: scrollable, padding 12px 24px 64px 24px
export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 24px 64px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ReplyContainer = styled.div`
  padding: 16px;
  box-sizing: border-box;
  border-top: 1px solid var(--border-tertiary);
`;
