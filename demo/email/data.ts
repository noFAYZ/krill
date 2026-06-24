export type MailLabel = 'inbox' | 'sent' | 'drafts' | 'archive' | 'trash';

export interface UserLabel {
  id: string;
  name: string;
  color: string;
}

export const INITIAL_USER_LABELS: UserLabel[] = [{ id: 'label-clients', name: 'Clients', color: 'orange' }];

export interface Thread {
  id: string;
  label: MailLabel;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  unread: boolean;
  starred: boolean;
}

export const LABELS: { key: MailLabel; name: string }[] = [
  { key: 'inbox', name: 'Inbox' },
  { key: 'sent', name: 'Sent' },
  { key: 'drafts', name: 'Draft' },
  { key: 'archive', name: 'Archive' },
  { key: 'trash', name: 'Trash' }
];

export const INITIAL_THREADS: Thread[] = [
  {
    id: '1',
    label: 'inbox',
    senderName: 'Priya Nair',
    senderEmail: 'priya@orbitlabs.dev',
    subject: 'Design review for the Q3 launch',
    preview: "Hey, can we push the design review to Thursday? I'd like to...",
    body: "Hey,\n\nCan we push the design review to Thursday? I'd like to get the updated mocks in front of the team before we lock anything down.\n\nLet me know if that works.\n\nPriya",
    timestamp: '9:41 AM',
    unread: true,
    starred: false
  },
  {
    id: '2',
    label: 'inbox',
    senderName: 'Marcus Webb',
    senderEmail: 'marcus@northwind.io',
    subject: 'Re: Invoice #4471',
    preview: 'Thanks for the quick turnaround on this. Confirming payment was...',
    body: 'Thanks for the quick turnaround on this. Confirming payment was sent this morning, should clear within 2-3 business days.\n\nMarcus',
    timestamp: '8:15 AM',
    unread: true,
    starred: true
  },
  {
    id: '3',
    label: 'inbox',
    senderName: 'GitHub',
    senderEmail: 'notifications@github.com',
    subject: '[krill] New issue: Drawer not closing on mobile Safari',
    preview: 'alexr opened an issue: When opening the Drawer on iOS Safari...',
    body: "alexr opened an issue:\n\nWhen opening the Drawer on iOS Safari and tapping the backdrop, the drawer doesn't close on the first tap. Repro steps attached.",
    timestamp: 'Yesterday',
    unread: true,
    starred: false
  },
  {
    id: '4',
    label: 'inbox',
    senderName: 'Sasha Kim',
    senderEmail: 'sasha@northwind.io',
    subject: 'Lunch Friday?',
    preview: "No agenda, just haven't caught up in a while. That new place...",
    body: "No agenda, just haven't caught up in a while. That new place on 5th has good reviews if you're up for it.",
    timestamp: 'Yesterday',
    unread: false,
    starred: false
  },
  {
    id: '5',
    label: 'inbox',
    senderName: 'Linear',
    senderEmail: 'notify@linear.app',
    subject: 'Weekly digest: 6 issues closed, 3 opened',
    preview: 'Here is what happened in your workspace this week...',
    body: 'Here is what happened in your workspace this week:\n\n- 6 issues closed\n- 3 issues opened\n- 2 PRs merged',
    timestamp: 'Mon',
    unread: false,
    starred: false
  },
  {
    id: '6',
    label: 'inbox',
    senderName: 'Dana Ortiz',
    senderEmail: 'dana@orbitlabs.dev',
    subject: 'Contract renewal - signature needed',
    preview: 'The renewal is attached, just needs your signature on page 4...',
    body: 'The renewal is attached, just needs your signature on page 4. Let me know if you have questions about the updated terms.',
    timestamp: 'Mon',
    unread: false,
    starred: true
  },
  {
    id: '7',
    label: 'inbox',
    senderName: 'Tomas Heikkinen',
    senderEmail: 'tomas@buildwave.co',
    subject: 'Following up from the call',
    preview: 'Good chatting today. Sending over the deck we mentioned, let...',
    body: 'Good chatting today. Sending over the deck we mentioned, let me know if it answers your questions about timeline.',
    timestamp: 'Sun',
    unread: false,
    starred: false
  },
  {
    id: '8',
    label: 'inbox',
    senderName: 'Skiff',
    senderEmail: 'team@skiff.com',
    subject: "What's new: faster search, dark mode improvements",
    preview: 'This month we shipped a faster search index and refined...',
    body: 'This month we shipped a faster search index and refined dark mode contrast across the app. Full changelog inside.',
    timestamp: 'Last week',
    unread: false,
    starred: false
  },
  {
    id: '9',
    label: 'sent',
    senderName: 'You',
    senderEmail: 'me@example.com',
    subject: 'Re: Design review for the Q3 launch',
    preview: 'Thursday works on my end, will send a calendar invite.',
    body: 'Thursday works on my end, will send a calendar invite.',
    timestamp: '9:50 AM',
    unread: false,
    starred: false
  },
  {
    id: '10',
    label: 'sent',
    senderName: 'You',
    senderEmail: 'me@example.com',
    subject: 'Project status update',
    preview: 'Quick summary of where things stand heading into next week...',
    body: 'Quick summary of where things stand heading into next week. Overall on track, one open question on the API contract.',
    timestamp: 'Mon',
    unread: false,
    starred: false
  },
  {
    id: '11',
    label: 'drafts',
    senderName: 'You',
    senderEmail: 'me@example.com',
    subject: '(no subject)',
    preview: 'Hey team, wanted to circle back on...',
    body: 'Hey team, wanted to circle back on',
    timestamp: 'Sat',
    unread: false,
    starred: false
  },
  {
    id: '12',
    label: 'archive',
    senderName: 'Northwind Billing',
    senderEmail: 'billing@northwind.io',
    subject: 'Your receipt for May',
    preview: "Thanks for your payment. Here's your receipt for last month...",
    body: "Thanks for your payment. Here's your receipt for last month.",
    timestamp: 'May 3',
    unread: false,
    starred: false
  }
];
