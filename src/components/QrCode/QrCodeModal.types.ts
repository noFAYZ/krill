import { ThemeMode } from '../../types';

export interface QrCodeModalProps {
  description: string;
  link: string;
  onClose: () => void;
  open: boolean;
  title: string;
  buttonProps?: { label: string; onClick: () => void };
  forceTheme?: ThemeMode;
  logoImage?: string;
  secondaryTextProps?: { label: string; onClick: () => void };
}
