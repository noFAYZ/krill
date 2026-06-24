import * as React from 'react';

import Dropdown from '../Dropdown';

import { PopoverProps } from './Popover.types';

/** A click-triggered floating panel for arbitrary rich content. Built on Dropdown's positioning/portal logic. */
const Popover: React.FC<PopoverProps> = ({
  buttonRef,
  children,
  open,
  onClose,
  gapFromAnchor,
  maxWidth,
  portal = true,
  width
}) => (
  <Dropdown
    buttonRef={buttonRef}
    gapFromAnchor={gapFromAnchor}
    maxWidth={maxWidth}
    portal={portal}
    setShowDropdown={(show) => !show && onClose()}
    showDropdown={open}
    width={width}
  >
    {children}
  </Dropdown>
);

export default Popover;
