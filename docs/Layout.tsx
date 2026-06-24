import * as React from 'react';

import {
  Button,
  CommandMenu,
  CommandMenuItem,
  Icon,
  IconButton,
  Icons,
  KeyCodeSequence,
  MonoTag,
  Sidebar,
  SidebarSection,
  ThemeMode,
  Type,
  Typography,
  TypographySize,
  TypographyWeight,
  useHotkeys
} from '../src';
import packageJson from '../package.json';

import { Content, Footer, Shell, TopBar } from './Layout.styles';
import { REGISTRY_BY_CATEGORY } from './registry';

const GETTING_STARTED = [
  { slug: 'introduction', title: 'Introduction' },
  { slug: 'installation', title: 'Installation' }
];

interface LayoutProps {
  currentSlug: string;
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
  onNavigate: (slug: string) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentSlug, mode, onModeChange, onNavigate, children }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  useHotkeys('mod+k', () => setSearchOpen(true));

  const allEntries = [
    ...GETTING_STARTED,
    ...Object.values(REGISTRY_BY_CATEGORY)
      .flat()
      .map((doc) => ({ slug: doc.slug, title: doc.title }))
  ];

  const searchItems: CommandMenuItem[] = allEntries
    .filter((entry) => entry.title.toLowerCase().includes(query.toLowerCase()))
    .map((entry) => ({
      key: entry.slug,
      title: entry.title,
      leading: <Icons color='secondary' icon={Icon.Search} />,
      onSelect: () => {
        onNavigate(entry.slug);
        setSearchOpen(false);
        setQuery('');
      }
    }));

  const sections: SidebarSection[] = [
    {
      key: 'getting-started',
      label: 'Getting started',
      items: GETTING_STARTED.map((entry) => ({
        key: entry.slug,
        label: entry.title,
        active: entry.slug === currentSlug,
        onClick: () => onNavigate(entry.slug)
      }))
    },
    ...Object.entries(REGISTRY_BY_CATEGORY).map(([category, docs]) => ({
      key: category,
      label: category,
      collapsible: true,
      defaultOpen: true,
      items: docs.map((doc) => ({
        key: doc.slug,
        label: doc.title,
        active: doc.slug === currentSlug,
        onClick: () => onNavigate(doc.slug)
      }))
    }))
  ];

  return (
    <Shell>
      <Sidebar
        footer={
          <Footer>
            <MonoTag color='green' label={`v${packageJson.version}`} />
          </Footer>
        }
        sections={sections}
      >
        <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
          Krill
        </Typography>
      </Sidebar>
      <Content>
        <TopBar>
          <Button icon={Icon.Search} type={Type.SECONDARY} onClick={() => setSearchOpen(true)}>
            Search
          </Button>
          <KeyCodeSequence shortcut='cmd+k' />
          <IconButton
            icon={mode === ThemeMode.DARK ? Icon.Sun : Icon.Moon}
            tooltip={mode === ThemeMode.DARK ? 'Switch to light theme' : 'Switch to dark theme'}
            type={Type.SECONDARY}
            onClick={() => onModeChange(mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)}
          />
        </TopBar>
        {children}
      </Content>

      <CommandMenu
        items={searchItems}
        open={searchOpen}
        placeholder='Search documentation...'
        query={query}
        onClose={() => {
          setSearchOpen(false);
          setQuery('');
        }}
        onQueryChange={setQuery}
      />
    </Shell>
  );
};

export default Layout;
