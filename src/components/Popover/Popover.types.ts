export interface PopoverProps {
  buttonRef: React.MutableRefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  /** Created gap, in px, between the anchor and the popover */
  gapFromAnchor?: number;
  maxWidth?: number | string;
  /** Renders the popover in a portal. Defaults to true */
  portal?: boolean;
  width?: number | string;
}
