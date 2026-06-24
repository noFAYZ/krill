import styled, { css } from 'styled-components';

import { Size, ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

import { KeyCodeSequenceSize } from './KeyCodeSequence.constants';

const SEQUENCE_CONTAINER_SMALL_CSS = css`
  gap: 4px;
`;
const SEQUENCE_CONTAINER_MEDIUM_CSS = css`
  gap: 6px;
`;
const SEQUENCE_CONTAINER_LARGE_CSS = css`
  gap: 8px;
`;

const SEQUENCE_CONTAINER_SIZE_CSS = (props: { $size: KeyCodeSequenceSize }) => {
  if (props.$size === Size.SMALL) return SEQUENCE_CONTAINER_SMALL_CSS;
  if (props.$size === Size.MEDIUM) return SEQUENCE_CONTAINER_MEDIUM_CSS;
  return SEQUENCE_CONTAINER_LARGE_CSS;
};

const KEY_CODE_SMALL_CSS = css`
  min-width: 20px;
  min-height: 20px;
  border-radius: 4px;
  padding: 0 4px;
`;
const KEY_CODE_MEDIUM_CSS = css`
  min-width: 24px;
  min-height: 24px;
  border-radius: 6px;
  padding: 0 8px;
`;
const KEY_CODE_LARGE_CSS = css`
  min-width: 32px;
  min-height: 32px;
  border-radius: 8px;
  padding: 0 8px;
`;

const KEY_CODE_SIZE_CSS = (props: { $size: KeyCodeSequenceSize }) => {
  if (props.$size === Size.SMALL) return KEY_CODE_SMALL_CSS;
  if (props.$size === Size.MEDIUM) return KEY_CODE_MEDIUM_CSS;
  return KEY_CODE_LARGE_CSS;
};

export const SequenceContainer = styled.div<{ $size: KeyCodeSequenceSize }>`
  display: flex;
  align-items: center;
  ${SEQUENCE_CONTAINER_SIZE_CSS}
`;

export const KeyCode = styled.div<{ $size: KeyCodeSequenceSize }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${getThemedColor('var(--bg-overlay-primary)', ThemeMode.DARK)};
  box-sizing: border-box;
  ${KEY_CODE_SIZE_CSS};
`;
