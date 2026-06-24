import { KeyCodeSequenceSize } from './KeyCodeSequence.constants';

export interface KeyCodeSequenceProps {
  /** Keys separated by '+' render together (pressed simultaneously); separated by ' ' render with "THEN" (pressed in sequence) */
  shortcut: string;
  size?: KeyCodeSequenceSize;
}
