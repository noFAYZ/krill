import { DropdownItemComponent } from '../DropdownItem';

export interface ContextMenuProps {
  /** Menu items shown at the cursor on right-click */
  children: DropdownItemComponent[] | React.ReactElement;
  /** The right-clickable trigger area; receives an onContextMenu handler */
  trigger: React.ReactElement<{ onContextMenu?: (e: React.MouseEvent) => void }>;
}
