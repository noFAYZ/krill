import { ThemeMode } from '../../types';

export interface QrCodeProps {
  /** The URL or text the QR code encodes */
  link: string;
  forceTheme?: ThemeMode;
  /** Optional logo image rendered in the center of the code (e.g. a data: URL or imported image) */
  logoImage?: string;
}
