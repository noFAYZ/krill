import * as React from 'react';

import { Size, ThemeMode } from '../../types';
import Typography from '../Typography';

import { TYPOGRAPHY_SIZE } from './KeyCodeSequence.constants';
import { KeyCode, SequenceContainer } from './KeyCodeSequence.styles';
import { KeyCodeSequenceProps } from './KeyCodeSequence.types';

const KeyCodeSequence: React.FC<KeyCodeSequenceProps> = ({ shortcut, size = Size.LARGE }) => {
  const typographySize = TYPOGRAPHY_SIZE[size];

  const renderSingleKeyCode = (keycode: string, key?: string) => (
    <KeyCode $size={size} key={key}>
      <Typography color='secondary' forceTheme={ThemeMode.DARK} size={typographySize}>
        {keycode.length === 1 ? keycode.toUpperCase() : keycode}
      </Typography>
    </KeyCode>
  );

  const renderSequence = () => {
    // Keys separated by a space are pressed separately, rendered with a "THEN" in between
    if (shortcut.includes(' ')) {
      const keycodes = shortcut.split(' ');
      return keycodes.map((keycode, i) => {
        const isLastKeyCode = i === keycodes.length - 1;
        return (
          <SequenceContainer $size={size} key={keycode}>
            {renderSingleKeyCode(keycode)}
            {!isLastKeyCode && (
              <Typography color='secondary' forceTheme={ThemeMode.DARK} size={typographySize}>
                THEN
              </Typography>
            )}
          </SequenceContainer>
        );
      });
    }
    // Keys separated by a + are pressed simultaneously, rendered next to each other
    if (shortcut.includes('+')) {
      return shortcut.split('+').map((keycode) => renderSingleKeyCode(keycode, keycode));
    }
    return renderSingleKeyCode(shortcut);
  };

  return <SequenceContainer $size={size}>{renderSequence()}</SequenceContainer>;
};

export default KeyCodeSequence;
