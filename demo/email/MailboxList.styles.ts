import styled from 'styled-components';

export const Container = styled.div<{ $fullWidth?: boolean }>`
  width: ${(props) => (props.$fullWidth ? '100%' : '420px')};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  box-sizing: border-box;
 
  ${(props) => !props.$fullWidth && 'border-right: 1px solid var(--border-secondary);'}
`;

export const SearchContainer = styled.div`
  padding: 12px 20px;
  box-sizing: border-box;
`;

export const ListHeader = styled.div`
  padding: 8px 20px 12px 20px;
  box-sizing: border-box;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
`;

export const SortRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderDivider = styled.div`
  height: 1px;
  background: var(--border-secondary);
`;

export const List = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const EmptyState = styled.div`
  padding: 24px;
  text-align: center;
`;

// Mirrors skemail-web's MessageCell.styles.ts: 56px row, single-line layout, no hover action icons
export const Row = styled.div<{ $active?: boolean; $unread?: boolean }>`
  display: flex;
  align-items: center;
  gap: 40px;
  height: 50px;
  padding: 10px 20px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--border-tertiary);
  overflow: hidden;
  cursor: pointer;
  background: ${(props) =>
    props.$active ? 'var(--border-tertiary)' : props.$unread ? 'var(--bg-l3-solid)' : 'transparent'};
  transition: background 0.05s ease;

  &:hover {
    background: var(--border-tertiary);
  }
`;

export const StartBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 200px;
  min-width: 80px;
  flex-shrink: 1;
`;

export const SenderName = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

export const ContentPreview = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
`;

export const SubjectWrap = styled.div`
  flex-shrink: 0;
  max-width: 50%;
  overflow: hidden;
`;

export const PreviewWrap = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

export const UnreadDot = styled.div<{ $visible?: boolean }>`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: var(--icon-link);
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.15s ease;
`;
