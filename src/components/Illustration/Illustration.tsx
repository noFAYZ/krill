import * as React from 'react';

import { StyledIllustration } from './Illustration.styles';
import { IllustrationProps, Illustrations } from './Illustration.types';

// esbuild-plugin-svgr turns these into real components at bundle time, but custom.d.ts types
// *.svg default exports as `string` (the URL-loader shape), so the cast keeps React.lazy happy.
const lazySvg = (factory: () => Promise<{ default: string }>) =>
  React.lazy(factory as unknown as () => Promise<{ default: React.ComponentType }>);

const ILLUSTRATION_SVGS: Record<Illustrations, React.LazyExoticComponent<React.ComponentType>> = {
  [Illustrations.BitcoinSymbol]: lazySvg(() => import('./assets/bitcoin-symbol.svg')),
  [Illustrations.CustomizeProfile]: lazySvg(() => import('./assets/customize-profile.svg')),
  [Illustrations.DarkMode]: lazySvg(() => import('./assets/dark-mode.svg')),
  [Illustrations.EmptyFilter]: lazySvg(() => import('./assets/empty-filter.svg')),
  [Illustrations.EmptyTrash]: lazySvg(() => import('./assets/empty-trash.svg')),
  [Illustrations.EnableNotifications]: lazySvg(() => import('./assets/enable-notifications.svg')),
  [Illustrations.EthSymbol]: lazySvg(() => import('./assets/eth-symbol.svg')),
  [Illustrations.LightMode]: lazySvg(() => import('./assets/light-mode.svg')),
  [Illustrations.NoResultsFound]: lazySvg(() => import('./assets/no-results-found.svg')),
  [Illustrations.OpenEnvelope]: lazySvg(() => import('./assets/open-envelope.svg')),
  [Illustrations.SystemMode]: lazySvg(() => import('./assets/system-mode.svg')),
  [Illustrations.UsdcSymbol]: lazySvg(() => import('./assets/usdc-symbol.svg'))
};

const Illustration: React.FC<IllustrationProps> = ({ illustration, scale = 1, style, includeBorderRadius }) => {
  const IllustrationSvg = ILLUSTRATION_SVGS[illustration];

  return (
    <StyledIllustration $includeBorderRadius={includeBorderRadius} $scale={scale} style={style}>
      <React.Suspense fallback={null}>
        <IllustrationSvg />
      </React.Suspense>
    </StyledIllustration>
  );
};

export default Illustration;
