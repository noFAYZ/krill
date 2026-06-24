export enum Illustrations {
  BitcoinSymbol,
  CustomizeProfile,
  DarkMode,
  EmptyFilter,
  EmptyTrash,
  EnableNotifications,
  EthSymbol,
  LightMode,
  NoResultsFound,
  OpenEnvelope,
  SystemMode,
  UsdcSymbol
}

export interface IllustrationProps {
  illustration: Illustrations;
  /** Rounds the illustration's corners */
  includeBorderRadius?: boolean;
  /** Uniform scale transform. Defaults to 1 */
  scale?: number;
  style?: React.CSSProperties;
}
