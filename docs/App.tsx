import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { themeNames, ThemeMode, Typography } from '../src';

import ComponentPage from './components/ComponentPage';
import Layout from './Layout';
import IntroductionPage from './pages/IntroductionPage';
import InstallationPage from './pages/InstallationPage';
import { getDocBySlug } from './registry';

const getSlugFromHash = () => window.location.hash.replace(/^#/, '') || 'introduction';

const App = () => {
  const [slug, setSlug] = React.useState(getSlugFromHash);
  const [mode, setMode] = React.useState<ThemeMode>(ThemeMode.DARK);

  React.useEffect(() => {
    const onHashChange = () => setSlug(getSlugFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  React.useEffect(() => {
    const vars = themeNames[mode];
    Object.entries(vars).forEach(([key, val]) => document.documentElement.style.setProperty(key, val));
    document.body.style.margin = '0';
    document.body.style.background = 'var(--bg-l0-solid)';
    document.body.style.color = 'var(--text-primary)';
    document.body.style.fontFamily = 'sans-serif';
  }, [mode]);

  const navigate = (nextSlug: string) => {
    window.location.hash = nextSlug;
    setSlug(nextSlug);
  };

  const renderPage = () => {
    if (slug === 'introduction') return <IntroductionPage />;
    if (slug === 'installation') return <InstallationPage />;
    const doc = getDocBySlug(slug);
    if (doc) return <ComponentPage doc={doc} />;
    return <Typography color='secondary'>Nothing here yet.</Typography>;
  };

  return (
    <Layout currentSlug={slug} mode={mode} onModeChange={setMode} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
