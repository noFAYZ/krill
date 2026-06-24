import * as React from 'react';

import { Button } from '../Button';
import Dialog, { DialogType } from '../Dialog';
import Typography from '../Typography';

import { ButtonContainer, QRContainer, SecondaryTextContainer, Spacer } from './QrCodeModal.styles';
import { QrCodeModalProps } from './QrCodeModal.types';

// Lazy-loaded so the react-qrcode-logo dependency isn't pulled in until the modal actually opens
const QrCode = React.lazy(() => import('./QrCode'));

const QrCodeModal: React.FC<QrCodeModalProps> = ({
  title,
  description,
  link,
  open,
  onClose,
  forceTheme,
  logoImage,
  buttonProps,
  secondaryTextProps
}) => (
  <Dialog
    customContent
    description={description}
    hideCloseButton
    open={open}
    title={title}
    type={DialogType.PROMOTIONAL}
    onClose={onClose}
  >
    <React.Suspense fallback={null}>
      <QRContainer>
        <QrCode forceTheme={forceTheme} link={link} logoImage={logoImage} />
      </QRContainer>
    </React.Suspense>
    <Spacer />
    {buttonProps && (
      <>
        <ButtonContainer>
          <Button fullWidth onClick={buttonProps.onClick}>
            {buttonProps.label}
          </Button>
        </ButtonContainer>
        {secondaryTextProps && (
          <SecondaryTextContainer>
            <Typography color='secondary' onClick={secondaryTextProps.onClick}>
              {secondaryTextProps.label}
            </Typography>
          </SecondaryTextContainer>
        )}
      </>
    )}
  </Dialog>
);

export default QrCodeModal;
