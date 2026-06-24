import * as React from 'react';

import { Banner, CircularProgress, EmptyIllustration, Icon, ProgressBar, Skeleton, Toast } from '../../src';
import { ComponentDoc } from '../types';

const ToastDoc: ComponentDoc = {
  slug: 'toast',
  title: 'Toast',
  category: 'Feedback',
  description: 'A transient notification, typically summoned via the useToast hook rather than rendered directly.',
  importStatement: "import { Toast } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Toast title="Message sent" body="Your email was sent successfully." closeToast={() => {}} toastKey="demo" />`,
      Component: () =>
        React.createElement(Toast, {
          title: 'Message sent',
          body: 'Your email was sent successfully.',
          closeToast: () => {},
          toastKey: 'demo'
        } as React.ComponentProps<typeof Toast>)
    }
  ],
  props: [
    { name: 'title', type: 'string | JSX.Element', description: 'Bolded header above the body text.' },
    { name: 'body', type: 'string', description: 'Main toast text.' },
    { name: 'icon', type: 'Icon', description: 'Optional leading icon.' },
    { name: 'actions', type: '{ label: string; onClick: () => void }[]', description: 'CTAs rendered in the toast.' },
    { name: 'duration', type: 'number', description: 'Ms before auto-dismissing.', default: 'TOAST_DEFAULT_DURATION' },
    { name: 'persist', type: 'boolean', description: 'Keeps the toast on screen until manually closed.' }
  ]
};

const BannerDoc: ComponentDoc = {
  slug: 'banner',
  title: 'Banner',
  category: 'Feedback',
  description:
    'A full-width, dismissible message bar with optional CTAs. ThemedBanner wraps it to always render in the opposite of the current theme.',
  importStatement: "import { Banner } from 'krill';",
  examples: [
    {
      title: 'With a call to action',
      code: `<Banner label="This is a banner" icon={Icon.Info} ctas={[{ label: 'Action', onClick: () => {} }]} />`,
      Component: () => (
        <Banner ctas={[{ label: 'Action', onClick: () => {} }]} icon={Icon.Info} label='This is a banner' />
      )
    }
  ],
  props: [
    { name: 'label', type: 'string', description: 'Banner text.', required: true },
    { name: 'color', type: 'AccentColor', description: 'Accent color.' },
    { name: 'icon', type: 'Icon', description: 'Leading icon.' },
    { name: 'ctas', type: '{ label: string; onClick: () => void }[]', description: 'Action buttons.' },
    { name: 'onClose', type: '() => void', description: 'Shows a close button and calls this when clicked.' }
  ]
};

const ProgressBarDoc: ComponentDoc = {
  slug: 'progress-bar',
  title: 'ProgressBar',
  category: 'Feedback',
  description: 'A determinate horizontal progress indicator.',
  importStatement: "import { ProgressBar } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<ProgressBar progress={60} />`,
      Component: () => (
        <div style={{ width: 200 }}>
          <ProgressBar progress={60} />
        </div>
      )
    }
  ],
  props: [{ name: 'progress', type: 'number', description: 'Percentage complete, 0–100.', required: true }]
};

const CircularProgressDoc: ComponentDoc = {
  slug: 'circular-progress',
  title: 'CircularProgress',
  category: 'Feedback',
  description: 'A circular progress indicator, usable as a determinate ring or an indeterminate spinner.',
  importStatement: "import { CircularProgress } from 'krill';",
  examples: [
    {
      title: 'Spinner and determinate ring',
      code: `<CircularProgress spinner />
<CircularProgress progress={40} />`,
      Component: () => (
        <>
          <CircularProgress spinner />
          <CircularProgress progress={40} />
        </>
      )
    }
  ],
  props: [
    { name: 'spinner', type: 'boolean', description: 'Renders an indeterminate spinning ring.' },
    { name: 'progress', type: 'number', description: 'Percentage complete, 0–100, for determinate mode.' },
    { name: 'size', type: 'CircularProgressSize', description: 'Ring size.', default: 'Size.MEDIUM' }
  ]
};

const SkeletonDoc: ComponentDoc = {
  slug: 'skeleton',
  title: 'Skeleton',
  category: 'Feedback',
  description: 'A loading placeholder block.',
  importStatement: "import { Skeleton } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Skeleton width={120} height={16} />`,
      Component: () => <Skeleton height={16} width={120} />
    }
  ],
  props: [
    { name: 'width', type: 'number | string', description: 'Skeleton width.' },
    { name: 'height', type: 'number | string', description: 'Skeleton height.' }
  ]
};

const EmptyIllustrationDoc: ComponentDoc = {
  slug: 'empty-illustration',
  title: 'EmptyIllustration',
  category: 'Feedback',
  description: 'A title/subtitle/action composition for empty states, with a default skeleton-list illustration.',
  importStatement: "import { EmptyIllustration } from 'krill';",
  examples: [
    {
      title: 'With an action',
      code: `<EmptyIllustration title="No messages" subtitle="Your inbox is empty" action={{ label: 'Compose', onClick: () => {} }} />`,
      Component: () => (
        <div style={{ height: 200, width: 320 }}>
          <EmptyIllustration
            action={{ label: 'Compose', onClick: () => {} }}
            subtitle='Your inbox is empty'
            title='No messages'
          />
        </div>
      )
    }
  ],
  props: [
    { name: 'title', type: 'string', description: 'Title text.', required: true },
    { name: 'subtitle', type: 'string', description: 'Subtitle text below the title.', required: true },
    {
      name: 'action',
      type: '{ label: string; onClick: () => void }',
      description: 'Renders a button below the subtitle.'
    },
    {
      name: 'illustration',
      type: 'React.ReactNode',
      description: 'Custom visual rendered above the title/subtitle.',
      default: 'a generic skeleton list illustration'
    }
  ]
};

export const FEEDBACK_DOCS: ComponentDoc[] = [
  ToastDoc,
  BannerDoc,
  ProgressBarDoc,
  CircularProgressDoc,
  SkeletonDoc,
  EmptyIllustrationDoc
];
