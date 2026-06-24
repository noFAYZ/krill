import * as React from 'react';

import {
  Avatar,
  Button,
  ConfirmModal,
  CopyToClipboardButton,
  EncryptionBadge,
  EncryptionBadgeType,
  Icon,
  IconButton,
  Icons,
  Type,
  Typography,
  TypographySize,
  TypographyWeight
} from '../../src';

import {
  Body,
  Container,
  EmailRow,
  EmptyState,
  Header,
  HeaderActions,
  ReplyContainer,
  SenderInfo,
  SenderRow
} from './ThreadView.styles';
import { Thread } from './data';

interface ThreadViewProps {
  thread?: Thread;
  onArchive: (ids: string[]) => void;
  onBlockSender: (thread: Thread) => void;
  onDelete: (ids: string[]) => void;
  onReply: (thread: Thread) => void;
  onToggleStar: (id: string) => void;
}

const ThreadView: React.FC<ThreadViewProps> = ({ thread, onArchive, onBlockSender, onDelete, onReply, onToggleStar }) => {
  const [confirmBlockOpen, setConfirmBlockOpen] = React.useState(false);

  if (!thread) {
    return (
      <Container>
        <EmptyState>
          <Icons color='disabled' icon={Icon.Envelope} size={32} />
          <Typography color='secondary'>Select a message to read</Typography>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Typography size={TypographySize.H4} weight={TypographyWeight.MEDIUM} wrap>
          {thread.subject}
        </Typography>
        <HeaderActions>
          <IconButton
            icon={Icon.Star}
            onClick={() => onToggleStar(thread.id)}
            tooltip={thread.starred ? 'Unstar' : 'Star'}
            type={Type.SECONDARY}
          />
          <IconButton
            icon={Icon.Archive}
            onClick={() => onArchive([thread.id])}
            tooltip='Archive'
            type={Type.SECONDARY}
          />
          <IconButton icon={Icon.Trash} onClick={() => onDelete([thread.id])} tooltip='Delete' type={Type.SECONDARY} />
          <IconButton
            icon={Icon.Spam}
            tooltip='Block sender'
            type={Type.SECONDARY}
            onClick={() => setConfirmBlockOpen(true)}
          />
        </HeaderActions>
      </Header>

      <SenderRow>
        <Avatar
          label={thread.senderName
            .split(' ')
            .map((p) => p[0])
            .join('')
            .toUpperCase()}
        />
        <SenderInfo>
          <Typography weight={TypographyWeight.MEDIUM}>{thread.senderName}</Typography>
          <EmailRow>
            <Typography color='secondary' size={TypographySize.SMALL}>
              {thread.senderEmail}
            </Typography>
            <CopyToClipboardButton onClick={() => navigator.clipboard?.writeText(thread.senderEmail)} />
          </EmailRow>
        </SenderInfo>
        <Typography color='secondary' size={TypographySize.SMALL}>
          {thread.timestamp}
        </Typography>
        <EncryptionBadge hideTooltip type={EncryptionBadgeType.E2EE} />
      </SenderRow>

      <Body>
        {thread.body.split('\n').map((line, index) => (
          <Typography key={index} wrap>
            {line || ' '}
          </Typography>
        ))}
      </Body>

      <ReplyContainer>
        <Button icon={Icon.Reply} onClick={() => onReply(thread)}>
          Reply
        </Button>
      </ReplyContainer>

      <ConfirmModal
        confirmName='Block'
        description={`${thread.senderName} won't be able to email you again.`}
        destructive
        open={confirmBlockOpen}
        title={`Block ${thread.senderName}?`}
        onClose={() => setConfirmBlockOpen(false)}
        onConfirm={() => {
          setConfirmBlockOpen(false);
          onBlockSender(thread);
        }}
      />
    </Container>
  );
};

export default ThreadView;
