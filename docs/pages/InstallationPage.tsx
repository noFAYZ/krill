import * as React from 'react';

import { CodeBlock, Typography, TypographySize, TypographyWeight } from '../../src';
import { Header, PageContainer, Section, SectionTitle } from '../components/ComponentPage.styles';

const InstallationPage: React.FC = () => (
  <PageContainer>
    <Header>
      <Typography size={TypographySize.H2} weight={TypographyWeight.BOLD}>
        Installation
      </Typography>
      <Typography color='secondary' wrap>
        Krill requires React 17 as a peer dependency.
      </Typography>
    </Header>

    <Section>
      <SectionTitle>
        <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
          1. Install the package
        </Typography>
      </SectionTitle>
      <CodeBlock code='npm install krill react@^17 react-dom@^17' language='bash' />
    </Section>

    <Section>
      <SectionTitle>
        <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
          2. Set theme variables
        </Typography>
      </SectionTitle>
      <Typography wrap>
        Krill resolves all colors from CSS custom properties — it doesn&apos;t inject them itself. Apply{' '}
        <code>themeNames.light</code> or <code>themeNames.dark</code> to your document root once at startup, and
        whenever the user switches themes.
      </Typography>
      <CodeBlock
        code={`import { themeNames, ThemeMode } from 'krill';

function applyTheme(mode: ThemeMode) {
  const vars = themeNames[mode];
  Object.entries(vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

applyTheme(ThemeMode.DARK);`}
      />
    </Section>

    <Section>
      <SectionTitle>
        <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
          3. Use a component
        </Typography>
      </SectionTitle>
      <CodeBlock
        code={`import { Button, Icon } from 'krill';

export function ComposeButton() {
  return (
    <Button icon={Icon.Compose} onClick={() => {}}>
      Compose
    </Button>
  );
}`}
      />
    </Section>

    <Section>
      <SectionTitle>
        <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
          Optional peer features
        </Typography>
      </SectionTitle>
      <Typography wrap>
        A handful of components (DatePicker, TimeZonePicker, FileImport, QrCode, ReactPdf) pull in heavier dependencies
        — dayjs, date-fns, @mui/x-date-pickers, react-dropzone, react-qrcode-logo, react-pdf — that are already declared
        as Krill&apos;s own dependencies, so no extra install step is needed for them.
      </Typography>
    </Section>
  </PageContainer>
);

export default InstallationPage;
