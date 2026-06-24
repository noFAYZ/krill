import { ThemeMode } from '../../types';
import { BannerProps } from '../Banner';

export interface ThemedBannerProps extends Omit<BannerProps, 'forceTheme'> {
  /** The app's current theme; the banner renders in the opposite theme for contrast */
  currentTheme: ThemeMode;
}
