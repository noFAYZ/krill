import * as React from 'react';

import Dropdown from '../Dropdown';

import { ContextMenuProps } from './ContextMenu.types';

/** Right-click triggered menu, positioned at the cursor via Dropdown's customAnchor. */
const ContextMenu: React.FC<ContextMenuProps> = ({ children, trigger }) => {
  const [anchor, setAnchor] = React.useState<{ x: number; y: number } | undefined>(undefined);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnchor({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      {React.cloneElement(trigger, { onContextMenu: handleContextMenu })}
      {!!anchor && (
        <Dropdown customAnchor={anchor} portal setShowDropdown={() => setAnchor(undefined)} showDropdown>
          {children}
        </Dropdown>
      )}
    </>
  );
};

export default ContextMenu;
