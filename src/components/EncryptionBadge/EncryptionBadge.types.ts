export enum EncryptionBadgeType {
  E2EE = 'e2ee',
  Pgp = 'pgp',
  External = 'external'
}

export interface EncryptionBadgeProps {
  /** Determines which icon the badge shows: the E2EE shield, the PGP key, or the external lock */
  type?: EncryptionBadgeType;
  /** Tooltip subtext rendered below the title */
  tooltipSubtext?: string;
  hideTooltip?: boolean;
  /** Tints the icon green to indicate a trusted/verified key */
  isTrusted?: boolean;
  onClick?: () => void;
}
