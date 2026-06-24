import { FileRejection } from 'react-dropzone';

import { Icon } from '../Icons';

import { FileMimeTypesOrExtensions } from './common';

export type FileImportVariant = 'BOX' | 'BUTTON' | 'DROPZONE' | 'SELECT';

export interface FileImportProps {
  /**
   * BOX allows drag-n-drop and click-to-import inside a dashed dropzone.
   * BUTTON opens the browser's file picker on click.
   * DROPZONE wraps children in a draggable area that overlays import feedback while dragging.
   * SELECT renders one or more ImportSelect rows (with an optional folder-upload row).
   */
  variant: FileImportVariant;
  onFilesAdded: (newFiles: File[], isFolder?: boolean) => void;
  /** Accepted MIME types; omit to accept any file type */
  acceptedFileTypes?: FileMimeTypesOrExtensions[];
  /** Shows a second ImportSelect row for uploading a whole folder. Only relevant for the SELECT variant */
  compact?: boolean;
  /** Helper text under the dropzone. Defaults to listing accepted file types and max size */
  dropzoneDetailedMessage?: string;
  foldersUpload?: boolean;
  /** A label for the BUTTON/SELECT variants */
  label?: string;
  labelIcon?: Icon;
  /** Defaults to false */
  loading?: boolean;
  /** Defaults to 10 */
  maxFileSizeMegabytes?: number;
  onFilesRejected?: (rejectedFiles: FileRejection[]) => void;
  /** Programmatically opens the OS file picker on mount, when on a mobile-width viewport */
  openOnMountForMobile?: boolean;
  showDropzoneFileIcon?: boolean;
  /** A sublabel, relevant only for the SELECT variant */
  sublabel?: string;
}
