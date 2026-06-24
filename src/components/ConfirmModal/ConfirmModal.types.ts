import { ThemeMode } from '../../types';

export interface ConfirmModalProps {
  confirmName: string;
  onClose: (event?: React.MouseEvent, reason?: 'backdropClick' | 'escapeKeyDown') => void;
  onConfirm: (e: React.MouseEvent) => void | Promise<void>;
  open: boolean;
  title: string;
  dataTest?: string;
  description?: string;
  /** Whether the confirm button should use the destructive button type */
  destructive?: boolean;
  disableOffClick?: boolean;
  forceTheme?: ThemeMode;
  loading?: boolean;
  onSecondary?: () => void | Promise<void>;
  secondaryName?: string;
}
