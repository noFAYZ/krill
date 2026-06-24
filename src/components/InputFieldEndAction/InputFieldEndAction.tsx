import * as React from 'react';

import Icons from '../Icons';

import { InputFieldEndActionProps } from './InputFieldEndAction.types';

const InputFieldEndAction: React.FC<InputFieldEndActionProps> = ({ icon, onClick, forceTheme, size, tooltip }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Icons
        color={hover ? 'secondary' : 'disabled'}
        forceTheme={forceTheme}
        icon={icon}
        size={size}
        tooltip={tooltip}
        onClick={onClick}
      />
    </div>
  );
};

export default InputFieldEndAction;
