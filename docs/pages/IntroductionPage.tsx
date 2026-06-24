import * as React from 'react';

import { CodeBlock, Typography, TypographySize, TypographyWeight } from '../../src';
import { Header, PageContainer, Section, SectionTitle } from '../components/ComponentPage.styles';

const IntroductionPage: React.FC = () => (
  <PageContainer>
    <Header>
      <Typography size={TypographySize.H2} weight={TypographyWeight.BOLD}>
        Introduction
      </Typography>
      <Typography color='secondary' wrap>
        Krill is a standalone React component library — a design system extracted from Skiff&apos;s nightwatch-ui.
      </Typography>
    </Header>

    <Section>
      <Typography wrap>
        Every component is built from styled-components, themed entirely through CSS custom properties, and ships both
        CJS and ESM bundles with full TypeScript declarations. There is no required CSS framework, no global runtime,
        and no provider you must wrap your app in — each component manages its own styling.
      </Typography>
    </Section>

    <Section>
      <SectionTitle>
        <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
          Why Krill
        </Typography>
      </SectionTitle>
      <Typography wrap>
        Components are organized one-per-folder (Component.tsx, Component.types.ts, Component.styles.ts), every prop is
        documented with a JSDoc comment, and styled-component props that don&apos;t reach the DOM are prefixed with{' '}
        <code>$</code>. Theming flows through CSS variables resolved by a single <code>getThemedColor()</code> utility,
        so a consuming app only needs to define its own theme variables — Krill never injects them itself.
      </Typography>
    </Section>

    <Section>
      <SectionTitle>
        <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
          Quick example
        </Typography>
      </SectionTitle>
      <CodeBlock
        code={`import { Button, Icon } from 'krill';

function App() {
  return (
    <Button icon={Icon.Plus} onClick={() => console.log('clicked')}>
      Add item
    </Button>
  );
}`}
      />
    </Section>
  </PageContainer>
);

export default IntroductionPage;
