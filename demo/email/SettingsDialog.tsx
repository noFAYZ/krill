import * as React from 'react';

import {
  accentColorToPrimaryColor,
  Button,
  ColorSelector,
  Dialog,
  DialogType,
  EncryptionBadge,
  EncryptionBadgeType,
  Icon,
  Icons,
  InputField,
  ListItem,
  ProgressBar,
  RadioButton,
  Size,
  TextArea,
  ThemeMode,
  Toggle,
  Type,
  Typography,
  TypographySize,
  TypographyWeight
} from '../../src';

import { Body, ContentColumn, Field, NavColumn, RadioGroup, Row } from './SettingsDialog.styles';

export type SettingsCategory = 'general' | 'notifications' | 'appearance' | 'security' | 'blocked' | 'storage';

const CATEGORIES: { key: SettingsCategory; label: string; icon: Icon }[] = [
  { key: 'general', label: 'General', icon: Icon.User },
  { key: 'notifications', label: 'Notifications', icon: Icon.Bell },
  { key: 'appearance', label: 'Appearance', icon: Icon.Themes },
  { key: 'security', label: 'Privacy & security', icon: Icon.ShieldCheck },
  { key: 'blocked', label: 'Blocked senders', icon: Icon.Spam },
  { key: 'storage', label: 'Storage', icon: Icon.Server }
];

const INITIAL_BLOCKED_SENDERS = ['spam@promo-deals.net', 'no-reply@coldoutreach.io'];

interface SettingsDialogProps {
  initialCategory?: SettingsCategory;
  mode: ThemeMode;
  open: boolean;
  onClose: () => void;
  onModeChange: (mode: ThemeMode) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ initialCategory, mode, open, onClose, onModeChange }) => {
  const [category, setCategory] = React.useState<SettingsCategory>(initialCategory ?? 'general');
  const [displayName, setDisplayName] = React.useState('Alex Rivera');
  const [signature, setSignature] = React.useState('Sent from Krill Mail');
  const [accentColor, setAccentColor] = React.useState('orange');
  const [twoFactor, setTwoFactor] = React.useState(false);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [browserNotifications, setBrowserNotifications] = React.useState(false);
  const [notificationSound, setNotificationSound] = React.useState(true);
  const [blockedSenders, setBlockedSenders] = React.useState(INITIAL_BLOCKED_SENDERS);

  // Jump to the requested category whenever the dialog (re)opens, without an Effect
  const [trackedOpen, setTrackedOpen] = React.useState(open);
  if (open !== trackedOpen) {
    setTrackedOpen(open);
    if (open) setCategory(initialCategory ?? 'general');
  }

  const unblockSender = (sender: string) => setBlockedSenders((prev) => prev.filter((s) => s !== sender));

  const renderPanel = () => {
    switch (category) {
      case 'general':
        return (
          <ContentColumn>
            <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
              General
            </Typography>
            <Field>
              <Typography color='secondary' size={TypographySize.SMALL}>
                Display name
              </Typography>
              <InputField value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </Field>
            <Field>
              <Typography color='secondary' size={TypographySize.SMALL}>
                Default signature
              </Typography>
              <TextArea rows={4} value={signature} onChange={(e) => setSignature(e.target.value)} />
            </Field>
          </ContentColumn>
        );
      case 'notifications':
        return (
          <ContentColumn>
            <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
              Notifications
            </Typography>
            <Row>
              <Typography>Email notifications</Typography>
              <Toggle checked={emailNotifications} onChange={() => setEmailNotifications((value) => !value)} />
            </Row>
            <Row>
              <Typography>Browser notifications</Typography>
              <Toggle checked={browserNotifications} onChange={() => setBrowserNotifications((value) => !value)} />
            </Row>
            <Row>
              <Typography>Notification sound</Typography>
              <Toggle checked={notificationSound} onChange={() => setNotificationSound((value) => !value)} />
            </Row>
          </ContentColumn>
        );
      case 'appearance':
        return (
          <ContentColumn>
            <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
              Appearance
            </Typography>
            <Field>
              <Typography color='secondary' size={TypographySize.SMALL}>
                Theme
              </Typography>
              <RadioGroup>
                <RadioButton
                  checked={mode === ThemeMode.LIGHT}
                  label='Light'
                  onClick={() => onModeChange(ThemeMode.LIGHT)}
                />
                <RadioButton
                  checked={mode === ThemeMode.DARK}
                  label='Dark'
                  onClick={() => onModeChange(ThemeMode.DARK)}
                />
              </RadioGroup>
            </Field>
            <Field>
              <Typography color='secondary' size={TypographySize.SMALL}>
                Accent color
              </Typography>
              <ColorSelector colorToStyling={accentColorToPrimaryColor} value={accentColor} handleChange={setAccentColor} />
            </Field>
          </ContentColumn>
        );
      case 'security':
        return (
          <ContentColumn>
            <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
              Privacy & security
            </Typography>
            <Row>
              <Field>
                <Typography>End-to-end encryption</Typography>
                <Typography color='secondary' size={TypographySize.SMALL}>
                  All messages are encrypted by default
                </Typography>
              </Field>
              <EncryptionBadge hideTooltip type={EncryptionBadgeType.E2EE} />
            </Row>
            <Row>
              <Typography>Two-factor authentication</Typography>
              <Toggle checked={twoFactor} onChange={() => setTwoFactor((value) => !value)} />
            </Row>
          </ContentColumn>
        );
      case 'blocked':
        return (
          <ContentColumn>
            <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
              Blocked senders
            </Typography>
            {blockedSenders.length === 0 ? (
              <Typography color='secondary'>No blocked senders</Typography>
            ) : (
              blockedSenders.map((sender) => (
                <Row key={sender}>
                  <Typography>{sender}</Typography>
                  <Button type={Type.SECONDARY} onClick={() => unblockSender(sender)}>
                    Unblock
                  </Button>
                </Row>
              ))
            )}
          </ContentColumn>
        );
      case 'storage':
        return (
          <ContentColumn>
            <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
              Storage
            </Typography>
            <ProgressBar progress={62} />
            <Typography color='secondary' size={TypographySize.SMALL}>
              6.2 GB of 10 GB used
            </Typography>
          </ContentColumn>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog customContent open={open} title='Settings' type={DialogType.SETTINGS} onClose={onClose}>
      <Body>
        <NavColumn>
          {CATEGORIES.map((item) => (
            <ListItem
              active={category === item.key}
              key={item.key}
              leading={
                <Icons color={category === item.key ? 'primary' : 'secondary'} icon={item.icon} size={Size.SMALL} />
              }
              title={item.label}
              onClick={() => setCategory(item.key)}
            />
          ))}
        </NavColumn>
        {renderPanel()}
      </Body>
    </Dialog>
  );
};

export default SettingsDialog;
