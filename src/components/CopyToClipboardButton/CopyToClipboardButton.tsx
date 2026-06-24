import * as React from 'react';

import AnimatedCopyIcon from './AnimatedCopyIcon';
import { ButtonContainer } from './CopyToClipboardButton.styles';
import { CopyToClipboardButtonProps } from './CopyToClipboardButton.types';

export const COPIED_DURATION = 2500;

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ onClick, className }) => {
  const [isClicked, setIsClicked] = React.useState(false);

  React.useEffect(() => {
    if (!isClicked) return undefined;
    const timer = setTimeout(() => setIsClicked(false), COPIED_DURATION);
    return () => clearTimeout(timer);
  }, [isClicked]);

  return (
    <ButtonContainer
      aria-label='Copy to clipboard'
      className={className}
      disabled={isClicked}
      title='Copy to clipboard'
      onClick={(e) => {
        onClick(e);
        setIsClicked(true);
      }}
    >
      <AnimatedCopyIcon isClicked={isClicked} />
    </ButtonContainer>
  );
};

export default CopyToClipboardButton;
