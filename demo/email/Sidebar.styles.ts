import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const BrandBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

export const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
`;

export const LogoMark = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--icon-link);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
