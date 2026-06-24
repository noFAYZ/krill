import styled, { css } from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';
import { DISPLAY_SCROLLBAR_CSS } from '../../styles';

export const EditorContainer = styled.div<{ forceTheme?: ThemeMode }>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${(props) => getThemedColor('var(--border-secondary)', props.forceTheme)};
  overflow: hidden;
`;

export const Toolbar = styled.div<{ forceTheme?: ThemeMode }>`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px 8px;
  border-bottom: 1px solid ${(props) => getThemedColor('var(--border-secondary)', props.forceTheme)};
`;

const PROSE_MIRROR_CSS = css<{ forceTheme?: ThemeMode }>`
  .ProseMirror {
    outline: none;
    min-height: 100%;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.5;
    color: ${(props) => getThemedColor('var(--text-primary)', props.forceTheme)};

    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
      color: ${(props) => getThemedColor('var(--text-disabled)', props.forceTheme)};
    }

    a {
      text-decoration: underline;
      color: ${(props) => getThemedColor('var(--text-link)', props.forceTheme)};
    }

    ul,
    ol {
      padding-left: 24px;
    }

    blockquote {
      padding-left: 12px;
      color: ${(props) => getThemedColor('var(--text-secondary)', props.forceTheme)};
      border-left: 2px solid ${(props) => getThemedColor('var(--border-secondary)', props.forceTheme)};
    }
  }
`;

export const EditorScrollArea = styled.div<{ forceTheme?: ThemeMode; $minHeight?: number | string }>`
  flex: 1;
  box-sizing: border-box;
  padding: 12px 16px;
  overflow-y: auto;
  min-height: ${(props) => (typeof props.$minHeight === 'string' ? props.$minHeight : `${props.$minHeight ?? 120}px`)};

  ${DISPLAY_SCROLLBAR_CSS}
  ${PROSE_MIRROR_CSS}
`;
