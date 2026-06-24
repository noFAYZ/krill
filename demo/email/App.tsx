import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CommandMenu, CommandMenuItem, Icon, Icons, ThemedBanner, ThemeMode, Toast, themeNames, useHotkeys } from '../../src';

import ComposeDialog from './ComposeDialog';
import CreateLabelModal from './CreateLabelModal';
import { INITIAL_THREADS, INITIAL_USER_LABELS, LABELS, MailLabel, Thread, UserLabel } from './data';
import { Body, BrowserContainer, FullScreen, ToastContainer } from './Layout.styles';
import MailboxList from './MailboxList';
import SettingsDialog, { SettingsCategory } from './SettingsDialog';
import Sidebar from './Sidebar';
import ThreadView from './ThreadView';

interface ReplyTarget {
  to?: string;
  subject?: string;
}

const App = () => {
  const [threads, setThreads] = React.useState<Thread[]>(INITIAL_THREADS);
  const [activeLabel, setActiveLabel] = React.useState<MailLabel>('inbox');
  const [activeThreadId, setActiveThreadId] = React.useState<string | null>(null);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [composeOpen, setComposeOpen] = React.useState(false);
  const [replyTarget, setReplyTarget] = React.useState<ReplyTarget | null>(null);
  const [mode, setMode] = React.useState<ThemeMode>(ThemeMode.LIGHT);
  const [toast, setToast] = React.useState<{ id: number; title: string; body: string } | null>(null);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [commandQuery, setCommandQuery] = React.useState('');
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [settingsCategory, setSettingsCategory] = React.useState<SettingsCategory>('general');
  const [labels, setLabels] = React.useState<UserLabel[]>(INITIAL_USER_LABELS);
  const [createLabelOpen, setCreateLabelOpen] = React.useState(false);
  const [storageBannerOpen, setStorageBannerOpen] = React.useState(true);

  const openSettings = (category: SettingsCategory = 'general') => {
    setSettingsCategory(category);
    setSettingsOpen(true);
  };

  useHotkeys('mod+k', () => setCommandOpen(true));

  React.useEffect(() => {
    const vars = themeNames[mode];
    Object.entries(vars).forEach(([key, val]) => document.documentElement.style.setProperty(key, val));
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.background = 'var(--bg-l0-solid)';
    document.body.style.color = 'var(--text-primary)';
    document.body.style.fontFamily = 'sans-serif';
  }, [mode]);

  const showToast = (title: string, body: string) => setToast({ id: Date.now(), title, body });

  const updateThreads = (ids: string[], update: Partial<Thread>) =>
    setThreads((prev) => prev.map((thread) => (ids.includes(thread.id) ? { ...thread, ...update } : thread)));

  const clearActiveIfAffected = (ids: string[]) => {
    if (activeThreadId && ids.includes(activeThreadId)) setActiveThreadId(null);
  };

  const handleArchive = (ids: string[]) => {
    updateThreads(ids, { label: 'archive' });
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    clearActiveIfAffected(ids);
    showToast('Archived', `${ids.length} message${ids.length > 1 ? 's' : ''} archived.`);
  };

  const handleDelete = (ids: string[]) => {
    updateThreads(ids, { label: 'trash' });
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    clearActiveIfAffected(ids);
    showToast('Deleted', `${ids.length} message${ids.length > 1 ? 's' : ''} moved to trash.`);
  };

  const handleMarkRead = (ids: string[]) => updateThreads(ids, { unread: false });

  const handleToggleStar = (id: string) =>
    setThreads((prev) => prev.map((thread) => (thread.id === id ? { ...thread, starred: !thread.starred } : thread)));

  const handleToggleSelect = (id: string) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleSend = (data: { to: string[]; subject: string; body: string; attachments: string[] }) => {
    const newThread: Thread = {
      id: `sent-${Date.now()}`,
      label: 'sent',
      senderName: 'You',
      senderEmail: 'me@example.com',
      subject: data.subject || '(no subject)',
      preview: data.body.slice(0, 60),
      body: data.body,
      timestamp: 'Just now',
      unread: false,
      starred: false
    };
    setThreads((prev) => [newThread, ...prev]);
    const attachmentNote = data.attachments.length ? ` (${data.attachments.length} attachment(s))` : '';
    showToast('Message sent', `To: ${data.to.join(', ')}${attachmentNote}`);
  };

  const handleReply = (thread: Thread) => {
    setReplyTarget({ to: thread.senderEmail, subject: `Re: ${thread.subject}` });
    setComposeOpen(true);
  };

  const handleSidebarSelectThread = (thread: Thread) => {
    setActiveLabel(thread.label);
    setActiveThreadId(thread.id);
    setSelectedIds([]);
  };

  const handleCreateLabel = (label: { name: string; color: string }) => {
    setLabels((prev) => [...prev, { id: `label-${Date.now()}`, ...label }]);
    showToast('Label created', `"${label.name}" was added to your labels.`);
  };

  const handleBlockSender = (thread: Thread) => {
    showToast('Sender blocked', `${thread.senderName} won't be able to email you again.`);
  };

  const closeCommandMenu = () => {
    setCommandOpen(false);
    setCommandQuery('');
  };

  const commandItems: CommandMenuItem[] = threads
    .filter((thread) => `${thread.senderName} ${thread.subject}`.toLowerCase().includes(commandQuery.toLowerCase()))
    .slice(0, 8)
    .map((thread) => ({
      key: thread.id,
      title: thread.subject,
      subtitle: thread.senderName,
      leading: <Icons color='secondary' icon={Icon.Envelope} />,
      onSelect: () => {
        setActiveLabel(thread.label);
        setActiveThreadId(thread.id);
        closeCommandMenu();
      }
    }));

  const visibleThreads = threads.filter((thread) => thread.label === activeLabel);
  const activeThread = threads.find((thread) => thread.id === activeThreadId);
  const folderName = LABELS.find((label) => label.key === activeLabel)?.name ?? activeLabel;

  return (
    <FullScreen>
      {storageBannerOpen && (
        <ThemedBanner
          color='yellow'
          currentTheme={mode}
          ctas={[
            {
              label: 'Upgrade',
              onClick: () => {
                openSettings('storage');
                setStorageBannerOpen(false);
              }
            }
          ]}
          icon={Icon.Bolt}
          label="You're running low on storage. 6.2 GB of 10 GB used."
          onClose={() => setStorageBannerOpen(false)}
        />
      )}
      <BrowserContainer>
        <Sidebar
          activeLabel={activeLabel}
          labels={labels}
          mode={mode}
          threads={threads}
          onCompose={() => {
            setReplyTarget(null);
            setComposeOpen(true);
          }}
          onCreateLabel={() => setCreateLabelOpen(true)}
          onLabelChange={(label) => {
            setActiveLabel(label);
            setActiveThreadId(null);
            setSelectedIds([]);
          }}
          onModeChange={setMode}
          onOpenSearch={() => setCommandOpen(true)}
          onOpenSettings={() => openSettings('general')}
          onSelectThread={handleSidebarSelectThread}
        />

        <Body>
          <MailboxList
            activeThreadId={activeThreadId}
            folderName={folderName}
            fullWidth={!activeThread}
            onArchive={handleArchive}
            onClearSelection={() => setSelectedIds([])}
            onDelete={handleDelete}
            onMarkRead={handleMarkRead}
            onSelectThread={setActiveThreadId}
            onToggleSelect={handleToggleSelect}
            onToggleStar={handleToggleStar}
            selectedIds={selectedIds}
            threads={visibleThreads}
          />

          {activeThread && (
            <ThreadView
              onArchive={handleArchive}
              onBlockSender={handleBlockSender}
              onDelete={handleDelete}
              onReply={handleReply}
              onToggleStar={handleToggleStar}
              thread={activeThread}
            />
          )}
        </Body>
      </BrowserContainer>

      <ComposeDialog
        initialSubject={replyTarget?.subject}
        initialTo={replyTarget?.to}
        onClose={() => setComposeOpen(false)}
        onSend={handleSend}
        open={composeOpen}
      />

      <CommandMenu
        items={commandItems}
        onClose={closeCommandMenu}
        onQueryChange={setCommandQuery}
        open={commandOpen}
        placeholder='Jump to a message...'
        query={commandQuery}
      />

      <SettingsDialog
        initialCategory={settingsCategory}
        mode={mode}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onModeChange={setMode}
      />

      <CreateLabelModal open={createLabelOpen} onClose={() => setCreateLabelOpen(false)} onCreate={handleCreateLabel} />

      {toast && (
        <ToastContainer>
          <Toast
            key={toast.id}
            {...({
              toastKey: toast.id,
              closeToast: () => setToast(null),
              onClose: () => setToast(null),
              title: toast.title,
              body: toast.body
            } as React.ComponentProps<typeof Toast>)}
          />
        </ToastContainer>
      )}
    </FullScreen>
  );
};

ReactDOM.render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
);
