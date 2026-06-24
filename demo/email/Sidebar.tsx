import * as React from 'react';

import {
  AccentColor,
  accentColorToPrimaryColor,
  Button,
  EncryptionBadge,
  EncryptionBadgeType,
  EventDot,
  Icon,
  IconButton,
  Icons,
  KeyCodeSequence,
  Sidebar as KrillSidebar,
  SidebarSection,
  Size,
  ThemeMode,
  Type,
  Typography,
  TypographySize,
  TypographyWeight
} from '../../src';

import { BrandBlock, FooterRow, Header, LogoMark, TitleBlock } from './Sidebar.styles';
import { LABELS, MailLabel, Thread, UserLabel } from './data';

interface SidebarProps {
  activeLabel: MailLabel;
  labels: UserLabel[];
  mode: ThemeMode;
  threads: Thread[];
  onCompose: () => void;
  onCreateLabel: () => void;
  onLabelChange: (label: MailLabel) => void;
  onModeChange: (mode: ThemeMode) => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onSelectThread: (thread: Thread) => void;
}

const LABEL_ICONS: Record<MailLabel, Icon> = {
  inbox: Icon.Inbox,
  sent: Icon.Send,
  drafts: Icon.FileEmpty,
  archive: Icon.Archive,
  trash: Icon.Trash
};

const Sidebar: React.FC<SidebarProps> = ({
  activeLabel,
  labels,
  mode,
  threads,
  onCompose,
  onCreateLabel,
  onLabelChange,
  onModeChange,
  onOpenSearch,
  onOpenSettings,
  onSelectThread
}) => {
  const starredThreads = threads.filter((thread) => thread.starred);

  const sections: SidebarSection[] = [
    {
      key: 'utility',
      items: [
        {
          key: 'search',
          label: 'Search',
          icon: <Icons color='secondary' icon={Icon.Search} size={18} />,
          onClick: onOpenSearch
        },
        {
          key: 'settings',
          label: 'Settings',
          icon: <Icons color='secondary' icon={Icon.Settings} size={18} />,
          onClick: onOpenSettings
        }
      ]
    },
    {
      key: 'mail',
      label: 'Mail',
      items: LABELS.map(({ key, name }) => {
        const active = key === activeLabel;
        return {
          key,
          label: name,
          active,
          icon: <Icons color={active ? 'primary' : 'secondary'} icon={LABEL_ICONS[key]} size={18} />,
          onClick: () => onLabelChange(key)
        };
      })
    },
    {
      key: 'starred',
      label: 'Starred',
      collapsible: true,
      defaultOpen: starredThreads.length > 0,
      emptyLabel: 'No starred messages',
      items: starredThreads.map((thread) => ({
        key: thread.id,
        label: thread.subject,
        icon: <Icons color='secondary' icon={Icon.Star} size={18} />,
        onClick: () => onSelectThread(thread)
      }))
    },
    {
      key: 'labels',
      label: 'Labels',
      collapsible: true,
      defaultOpen: true,
      items: [
        ...labels.map((label) => ({
          key: label.id,
          label: label.name,
          icon: <EventDot color={accentColorToPrimaryColor[label.color as AccentColor]} />
        })),
        {
          key: 'new-label',
          label: 'New label',
          icon: <Icons color='secondary' icon={Icon.Plus} size={18} />,
          onClick: onCreateLabel
        }
      ]
    }
  ];

  return (
    <KrillSidebar
      footer={
        <FooterRow>
          <Typography color='disabled' mono size={TypographySize.CAPTION} uppercase>
            Search
          </Typography>
          <KeyCodeSequence shortcut='cmd+k' size={Size.SMALL} />
        </FooterRow>
      }
      sections={sections}
    >
      <Header>
        <BrandBlock>
          <LogoMark>
            <Icons color='white' icon={Icon.Envelope} size={16} />
          </LogoMark>
          <TitleBlock>
            <Typography weight={TypographyWeight.MEDIUM}>Krill Mail</Typography>
            <Typography color='secondary' size={TypographySize.CAPTION}>
              Component demo
            </Typography>
          </TitleBlock>
        </BrandBlock>
        <EncryptionBadge tooltipSubtext='Messages are encrypted end-to-end' type={EncryptionBadgeType.E2EE} />
        <IconButton
          icon={mode === ThemeMode.DARK ? Icon.Sun : Icon.Moon}
          onClick={() => onModeChange(mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)}
          tooltip={mode === ThemeMode.DARK ? 'Switch to light theme' : 'Switch to dark theme'}
          type={Type.SECONDARY}
        />
      </Header>

      <Button fullWidth icon={Icon.Compose} onClick={onCompose} type={Type.SECONDARY}>
        Compose
      </Button>
    </KrillSidebar>
  );
};

export default Sidebar;
