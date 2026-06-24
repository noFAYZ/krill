import * as React from 'react';
import { BrowserView, isTablet } from 'react-device-detect';

// Same as react-device-detect's BrowserView but excludes tablets
// https://github.com/duskload/react-device-detect/issues/146#issuecomment-881226784
const BrowserDesktopView: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  !isTablet ? <BrowserView>{children}</BrowserView> : null;

export default BrowserDesktopView;
