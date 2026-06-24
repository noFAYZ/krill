import { ThemeMode } from '../../types';

export interface SidebarItem {
  /** Unique key for the item */
  key: string;
  /** Primary text */
  label: string;
  /** Controls the row's selected/highlighted state, e.g. the active route */
  active?: boolean;
  /** Leading visual, e.g. an Icons element */
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface SidebarSection {
  /** Unique key for the section. Also used as the localStorage key when collapsible */
  key: string;
  /** Rows rendered in this section, via ListItem */
  items: SidebarItem[];
  /** Lets the user collapse/expand this section; open state persists in localStorage. Requires a label */
  collapsible?: boolean;
  /** Initial open state the first time a collapsible section is seen. Defaults to true */
  defaultOpen?: boolean;
  /** Shown in place of the item list when items is empty */
  emptyLabel?: string;
  /** Optional heading rendered above the items. Sections without a label render without one */
  label?: string;
}

export interface SidebarProps {
  /** Nav sections rendered below children, e.g. mailbox labels grouped under a heading */
  sections: SidebarSection[];
  /** Free-form content rendered above the sections, e.g. a logo/header row or a primary action button */
  children?: React.ReactNode;
  /** For styled components */
  className?: string;
  /** E2E test indicator */
  dataTest?: string;
  /** Rendered below the sections, pinned to the bottom of the sidebar */
  footer?: React.ReactNode;
  forceTheme?: ThemeMode;
  /** For customization */
  style?: React.CSSProperties;
  /** Sidebar width. Defaults to 240px */
  width?: number | string;
}
