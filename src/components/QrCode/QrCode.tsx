import * as React from 'react';
import { QRCode as ReactQrCode } from 'react-qrcode-logo';

import { ThemeMode } from '../../types';

import { QrCodeProps } from './QrCode.types';

const QrCode: React.FC<QrCodeProps> = ({ link, forceTheme, logoImage }) => (
  <ReactQrCode
    bgColor={forceTheme === ThemeMode.LIGHT ? 'white' : '#242424'}
    ecLevel='H'
    eyeRadius={50}
    fgColor={forceTheme === ThemeMode.LIGHT ? '#242424' : 'white'}
    logoImage={logoImage}
    logoWidth={logoImage ? 80 : undefined}
    removeQrCodeBehindLogo
    size={256}
    value={link}
  />
);

export default QrCode;
