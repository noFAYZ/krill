import * as React from 'react';

import { ThemeMode } from '../../types';
import Banner from '../Banner';

import { ThemedBannerProps } from './ThemedBanner.types';

// Always renders in the theme opposite the app's current one, for contrast against the page behind it
const ThemedBanner: React.FC<ThemedBannerProps> = ({ currentTheme, ...bannerProps }) => (
  <Banner {...bannerProps} forceTheme={currentTheme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT} />
);

export default ThemedBanner;
