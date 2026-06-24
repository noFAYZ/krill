import * as React from 'react';

import { FileImport, Illustration, Illustrations, QrCode, ThemeMode, Typography } from '../../src';
import { ComponentDoc } from '../types';

const FileImportDoc: ComponentDoc = {
  slug: 'file-import',
  title: 'FileImport',
  category: 'Media',
  description: 'A drag-and-drop / click-to-import file picker, in box, button, dropzone-overlay, or row-list variants.',
  importStatement: "import { FileImport } from 'krill';",
  examples: [
    {
      title: 'Box variant',
      code: `<FileImport variant="BOX" onFilesAdded={(files) => console.log(files)} />`,
      Component: () => (
        <div style={{ width: 320 }}>
          <FileImport variant='BOX' onFilesAdded={() => {}} />
        </div>
      )
    }
  ],
  props: [
    {
      name: 'variant',
      type: "'BOX' | 'BUTTON' | 'DROPZONE' | 'SELECT'",
      description:
        'BOX: dashed drag-n-drop area. BUTTON: opens the OS file picker. DROPZONE: wraps children, overlays feedback while dragging. SELECT: one or more clickable rows.',
      required: true
    },
    {
      name: 'onFilesAdded',
      type: '(newFiles: File[], isFolder?: boolean) => void',
      description: 'Called with the accepted files.',
      required: true
    },
    {
      name: 'acceptedFileTypes',
      type: 'FileMimeTypesOrExtensions[]',
      description: 'Accepted MIME types; omit to accept any file type.'
    },
    { name: 'maxFileSizeMegabytes', type: 'number', description: 'Max file size, in MB.', default: '10' },
    {
      name: 'foldersUpload',
      type: 'boolean',
      description: 'Shows a second row for uploading a whole folder (SELECT variant only).'
    },
    { name: 'label', type: 'string', description: 'Label for the BUTTON/SELECT variants.' },
    { name: 'loading', type: 'boolean', description: 'Loading state.', default: 'false' },
    {
      name: 'onFilesRejected',
      type: '(rejectedFiles: FileRejection[]) => void',
      description: 'Called with files that failed validation.'
    }
  ]
};

const IllustrationDoc: ComponentDoc = {
  slug: 'illustration',
  title: 'Illustration',
  category: 'Media',
  description: 'A library of bundled SVG illustrations for empty states, onboarding, and settings panels.',
  importStatement: "import { Illustration, Illustrations } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Illustration illustration={Illustrations.NoResultsFound} />
<Illustration illustration={Illustrations.EnableNotifications} />`,
      Component: () => (
        <>
          <Illustration illustration={Illustrations.NoResultsFound} />
          <Illustration illustration={Illustrations.EnableNotifications} />
        </>
      )
    }
  ],
  props: [
    { name: 'illustration', type: 'Illustrations', description: 'Which illustration to render.', required: true },
    { name: 'scale', type: 'number', description: 'Uniform scale transform.', default: '1' },
    { name: 'includeBorderRadius', type: 'boolean', description: "Rounds the illustration's corners." }
  ]
};

const QrCodeDoc: ComponentDoc = {
  slug: 'qr-code',
  title: 'QrCode / QrCodeModal',
  category: 'Media',
  description:
    'Renders a themed QR code for a URL or text, with an optional centered logo, and a Dialog-wrapped variant.',
  importStatement: "import { QrCode, QrCodeModal } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<QrCode link="https://example.com" forceTheme={ThemeMode.LIGHT} />`,
      Component: () => (
        <div style={{ overflow: 'hidden', width: 120 }}>
          <QrCode forceTheme={ThemeMode.LIGHT} link='https://example.com' />
        </div>
      )
    }
  ],
  props: [
    { name: 'link', type: 'string', description: 'The URL or text the QR code encodes.', required: true },
    {
      name: 'logoImage',
      type: 'string',
      description: 'Logo image rendered in the center of the code, e.g. a data: URL.'
    },
    {
      name: 'QrCodeModal props',
      type: '{ open, onClose, title, description, link, buttonProps?, secondaryTextProps?, logoImage? }',
      description: 'Wraps QrCode in a Dialog with title/description and optional action buttons.'
    }
  ]
};

const ReactPdfDoc: ComponentDoc = {
  slug: 'react-pdf',
  title: 'ReactPdf (PdfDocument / PdfPage)',
  category: 'Media',
  description:
    "Renders PDF files. A re-export of react-pdf's Document/Page, pre-wired to a CDN-free pdfjs-dist worker so consumers don't have to configure one themselves.",
  importStatement: "import { PdfDocument, PdfPage } from 'krill';",
  examples: [
    {
      title: 'Usage (needs a real PDF URL/File to render)',
      code: `<PdfDocument file="/path/to/file.pdf" onLoadSuccess={(pdf) => console.log(pdf.numPages)}>
  <PdfPage pageNumber={1} width={320} />
</PdfDocument>`,
      Component: () => (
        <Typography color='secondary'>This example needs a real PDF file to render — see the code.</Typography>
      )
    }
  ],
  props: [
    {
      name: 'PdfDocument file',
      type: 'string | File | Blob | Uint8Array',
      description: 'The PDF source.',
      required: true
    },
    {
      name: 'PdfDocument onLoadSuccess',
      type: '(pdf: PDFDocumentProxy) => void',
      description: 'Called once the document loads.'
    },
    { name: 'PdfPage pageNumber', type: 'number', description: 'Which page to render, 1-indexed.', default: '1' },
    { name: 'PdfPage width', type: 'number', description: 'Render width, in pixels.' },
    { name: 'PdfPage scale', type: 'number', description: 'Render scale factor.' }
  ]
};

export const MEDIA_DOCS: ComponentDoc[] = [FileImportDoc, IllustrationDoc, QrCodeDoc, ReactPdfDoc];
