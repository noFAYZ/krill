import { ThemeMode } from '../../types';

export interface RichTextEditorProps {
  /** Controlled HTML content */
  value: string;
  onChange: (html: string) => void;
  autoFocus?: boolean;
  /** For styled components */
  className?: string;
  /** Disables editing while still rendering content. Defaults to true */
  editable?: boolean;
  forceTheme?: ThemeMode;
  /** Minimum height of the editable area. Defaults to 120px */
  minHeight?: number | string;
  placeholder?: string;
  /** Shows the formatting toolbar. Defaults to true */
  showToolbar?: boolean;
}
