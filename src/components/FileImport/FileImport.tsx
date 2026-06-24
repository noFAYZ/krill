import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import useToast from '../../hooks/useToast';
import { Size, Type } from '../../types';
import { Button } from '../Button';
import CircularProgress, { RelativelyCentered } from '../CircularProgress';
import Icons, { Icon } from '../Icons';

import { FILE_MIME_TYPE_EXTENSIONS, FileMimeTypesOrExtensions, MB_SCALE_FACTOR } from './common';
import { FileImportProps } from './FileImport.types';
import ImportSelect from './ImportSelect';
import useInputProps from './useInputProps';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box' as const,
  padding: '18px',
  gap: '16px',
  borderWidth: 2,
  borderRadius: 10,
  borderColor: 'var(--border-secondary)',
  borderStyle: 'dashed',
  background: 'var(--bg-l0-solid)',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer'
};

const activeStyle = { borderColor: '#2196f3' };
const acceptStyle = { borderColor: '#027AFF' };
const loadingStyle = { borderColor: 'transparent' };

const DropzoneActiveOverlay = styled.div`
  background: var(--bg-cell-active);
  border: 1px solid var(--border-active);
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 1051;
`;

const selectVariantContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content !important',
  gap: 'inherit'
};

const FileImport: React.FC<React.PropsWithChildren<FileImportProps>> = ({
  variant,
  acceptedFileTypes,
  maxFileSizeMegabytes = 10,
  onFilesAdded,
  onFilesRejected,
  showDropzoneFileIcon = true,
  dropzoneDetailedMessage,
  label,
  labelIcon,
  sublabel,
  loading = false,
  children,
  openOnMountForMobile,
  foldersUpload,
  compact
}) => {
  const isMobileWidth = useMediaQuery('(max-width:479px)');
  const folderInputRef = React.useRef<HTMLInputElement>(null);
  const { enqueueToast, closeToast } = useToast();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    open: openFileInput
  } = useDropzone({
    onDropAccepted: (newFiles) => onFilesAdded(newFiles),
    onDropRejected: onFilesRejected,
    maxSize: maxFileSizeMegabytes * MB_SCALE_FACTOR,
    accept: acceptedFileTypes ? acceptedFileTypes.join(', ') : undefined,
    noKeyboard: true
  });

  const acceptLoadStyle = loading ? loadingStyle : acceptStyle;
  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptLoadStyle : {})
    }),
    [isDragActive, isDragAccept, acceptLoadStyle]
  );

  React.useEffect(() => {
    if (isMobileWidth && openOnMountForMobile) openFileInput();
  }, [isMobileWidth, openFileInput, openOnMountForMobile]);

  React.useEffect(() => {
    if (isDragActive) {
      enqueueToast({ title: 'Import files', body: 'Drop files to upload' });
    } else {
      closeToast();
    }
  }, [isDragActive, closeToast, enqueueToast]);

  // Two inputs (file + folder) because the input's type can't be changed on Safari,
  // and on Safari the folder input also doubles as a file input (unlike other browsers)
  const { fileInputProps, folderInputProps } = useInputProps({
    getInputProps,
    maxFileSizeMegabytes,
    onFilesRejected,
    onFilesAdded,
    acceptedFileTypes
  });

  if (loading) {
    return (
      <RelativelyCentered>
        <CircularProgress size={Size.X_MEDIUM} spinner />
      </RelativelyCentered>
    );
  }

  const openFolderInput = () => folderInputRef.current?.click();

  const baseContainerStyle = { overflow: 'auto', width: '100%' };
  const containerStyle =
    variant === 'SELECT' ? { ...baseContainerStyle, ...selectVariantContainerStyle } : baseContainerStyle;

  const acceptedExtensions = acceptedFileTypes
    ?.filter((type) => type !== FileMimeTypesOrExtensions.NONE)
    .flatMap((type) => FILE_MIME_TYPE_EXTENSIONS[type])
    .join(', ');

  return (
    <div style={containerStyle}>
      <input {...fileInputProps} />
      <input {...folderInputProps} ref={folderInputRef} />
      {variant === 'BUTTON' && !!label && (
        <Button type={Type.SECONDARY} onClick={openFileInput}>
          {label}
        </Button>
      )}
      {variant === 'SELECT' && (
        <>
          <ImportSelect
            compact={compact}
            dataTest='open-files-upload'
            icon={labelIcon || Icon.PaperClip}
            iconColor='secondary'
            label={label || 'Upload files'}
            subLabel={sublabel}
            onClick={openFileInput}
            onClickLabel='Upload'
          />
          {foldersUpload && (
            <ImportSelect
              dataTest='open-folder-upload'
              icon={Icon.Upload}
              iconColor='secondary'
              label='Upload folder'
              subLabel='Upload from your local computer'
              onClick={openFolderInput}
              onClickLabel='Upload'
            />
          )}
        </>
      )}
      {variant === 'BOX' && (
        <div {...getRootProps({ style })}>
          {showDropzoneFileIcon && <Icons color='secondary' icon={Icon.Upload} size={Size.X_LARGE} />}
          <div style={{ color: 'var(--text-primary)' }}>
            {isMobileWidth ? (
              'Tap here to select files'
            ) : (
              <>
                <span>Drop files or</span>
                <button
                  data-test='upload-files-open-file-input'
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '16px',
                    color: 'var(--text-link)',
                    outline: 'none'
                  }}
                  type='button'
                >
                  click
                </button>
                to select files
              </>
            )}
          </div>
          <div style={{ fontSize: '0.8em', color: 'var(--text-primary)', textAlign: 'center' }}>
            {dropzoneDetailedMessage ??
              `${acceptedExtensions ?? ''} accepted, ${Math.floor(maxFileSizeMegabytes)} MB max`}
          </div>
        </div>
      )}
      {variant === 'DROPZONE' && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- onClick is intentionally nulled; this is a drag-only target, the keyboard-accessible trigger is the children's own button
        <div style={{ position: isDragActive ? 'relative' : undefined }} {...getRootProps()} onClick={undefined}>
          {isDragActive && <DropzoneActiveOverlay />}
          {children}
        </div>
      )}
    </div>
  );
};

export default FileImport;
