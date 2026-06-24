import { Size } from '../../types';
import { TypographySize } from '../Typography';

export type KeyCodeSequenceSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

export const TYPOGRAPHY_SIZE: Record<KeyCodeSequenceSize, TypographySize> = {
  [Size.SMALL]: TypographySize.CAPTION,
  [Size.MEDIUM]: TypographySize.SMALL,
  [Size.LARGE]: TypographySize.MEDIUM
};
