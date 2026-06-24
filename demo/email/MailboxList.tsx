import * as React from 'react';

import {
  ActionBar,
  Avatar,
  Checkbox,
  Icon,
  IconButton,
  MobileSearch,
  Size,
  Type,
  Typography,
  TypographySize,
  TypographyWeight
} from '../../src';

import {
  Container,
  ContentPreview,
  EmptyState,
  HeaderDivider,
  List,
  ListHeader,
  PreviewWrap,
  Row,
  SearchContainer,
  SenderName,
  SortRow,
  StartBlock,
  SubjectWrap,
  TitleRow,
  UnreadDot
} from './MailboxList.styles';
import { Thread } from './data';

interface MailboxListProps {
  activeThreadId: string | null;
  folderName: string;
  fullWidth: boolean;
  selectedIds: string[];
  threads: Thread[];
  onArchive: (ids: string[]) => void;
  onClearSelection: () => void;
  onDelete: (ids: string[]) => void;
  onMarkRead: (ids: string[]) => void;
  onSelectThread: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onToggleStar: (id: string) => void;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const MailboxList: React.FC<MailboxListProps> = ({
  activeThreadId,
  folderName,
  fullWidth,
  selectedIds,
  threads,
  onArchive,
  onClearSelection,
  onDelete,
  onMarkRead,
  onSelectThread,
  onToggleSelect,
  onToggleStar
}) => {
  const [query, setQuery] = React.useState('');

  const visibleThreads = threads.filter((thread) => {
    const haystack = `${thread.senderName} ${thread.subject} ${thread.preview}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  const unreadCount = threads.filter((thread) => thread.unread).length;
  const allSelected = visibleThreads.length > 0 && visibleThreads.every((thread) => selectedIds.includes(thread.id));
  const someSelected = !allSelected && visibleThreads.some((thread) => selectedIds.includes(thread.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      onClearSelection();
    } else {
      visibleThreads.forEach((thread) => {
        if (!selectedIds.includes(thread.id)) onToggleSelect(thread.id);
      });
    }
  };

  return (
    <Container $fullWidth={fullWidth}>
      <SearchContainer>
        <MobileSearch placeHolder={`Search ${folderName.toLowerCase()}...`} resetKey={folderName} setSearchQuery={setQuery} />
      </SearchContainer>

      <ListHeader>
        <TitleRow>
          <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
            {folderName}
          </Typography>
          {unreadCount > 0 && (
            <Typography color='destructive' size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
              {unreadCount}
            </Typography>
          )}
        </TitleRow>
        <SortRow>
          <Checkbox checked={allSelected} indeterminate={someSelected} onClick={toggleSelectAll} />
          <Typography color='secondary' size={TypographySize.SMALL}>
            Most recent
          </Typography>
        </SortRow>
      </ListHeader>

      <HeaderDivider />

      <List>
        {visibleThreads.length === 0 && (
          <EmptyState>
            <Typography color='secondary'>No messages</Typography>
          </EmptyState>
        )}
        {visibleThreads.map((thread) => (
          <Row
            $active={thread.id === activeThreadId}
            $unread={thread.unread}
            key={thread.id}
            onClick={() => {
              onSelectThread(thread.id);
              if (thread.unread) onMarkRead([thread.id]);
            }}
          >
            <StartBlock>
              <Checkbox
                checked={selectedIds.includes(thread.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSelect(thread.id);
                }}
              />
              <Avatar label={getInitials(thread.senderName)} size={Size.MEDIUM} />
              <SenderName>
                <Typography>{thread.senderName}</Typography>
              </SenderName>
            </StartBlock>

            <ContentPreview>
              <UnreadDot $visible={thread.unread} />
              <SubjectWrap>
                <Typography weight={thread.unread ? TypographyWeight.MEDIUM : TypographyWeight.REGULAR}>
                  {thread.subject}
                </Typography>
              </SubjectWrap>
              <Typography color='secondary'>—</Typography>
              <PreviewWrap>
                <Typography color='secondary'>{thread.preview}</Typography>
              </PreviewWrap>
            </ContentPreview>

            {thread.starred && (
              <IconButton
                icon={Icon.Star}
                onClick={() => onToggleStar(thread.id)}
                tooltip='Unstar'
                type={Type.SECONDARY}
              />
            )}
          </Row>
        ))}
      </List>

      {selectedIds.length > 0 && (
        <ActionBar>
          <Typography color='secondary' size={TypographySize.SMALL}>
            {selectedIds.length} selected
          </Typography>
          <IconButton
            icon={Icon.EnvelopeRead}
            onClick={() => onMarkRead(selectedIds)}
            tooltip='Mark as read'
            type={Type.SECONDARY}
          />
          <IconButton
            icon={Icon.Archive}
            onClick={() => onArchive(selectedIds)}
            tooltip='Archive'
            type={Type.SECONDARY}
          />
          <IconButton icon={Icon.Trash} onClick={() => onDelete(selectedIds)} tooltip='Delete' type={Type.SECONDARY} />
          <IconButton icon={Icon.Close} onClick={onClearSelection} tooltip='Clear selection' type={Type.SECONDARY} />
        </ActionBar>
      )}
    </Container>
  );
};

export default MailboxList;
