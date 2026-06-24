import { DropzoneInputProps, ErrorCode, FileRejection } from 'react-dropzone';

import { FileMimeTypesOrExtensions, MB_SCALE_FACTOR } from './common';

interface CreateInputPropsProps {
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  maxFileSizeMegabytes: number;
  onFilesAdded: (newFiles: File[], isFolder?: boolean) => void;
  onFilesRejected?: (rejectedFiles: FileRejection[]) => void;
  acceptedFileTypes?: FileMimeTypesOrExtensions[];
}

function createInputProps({
  getInputProps,
  maxFileSizeMegabytes,
  onFilesRejected,
  onFilesAdded,
  acceptedFileTypes,
  directory
}: CreateInputPropsProps & { directory?: boolean }) {
  const inputProps = directory ? { ...getInputProps(), directory: '', webkitdirectory: '' } : { ...getInputProps() };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const acceptedFiles: File[] = [];
    const rejectedFiles: FileRejection[] = [];
    files.forEach((file) => {
      if (file.size / MB_SCALE_FACTOR > maxFileSizeMegabytes) {
        rejectedFiles.push({
          file,
          errors: [
            {
              message: `Max file size is ${Math.floor(maxFileSizeMegabytes)} MB, received file ${
                file.name
              } which has size ${Math.floor(file.size / MB_SCALE_FACTOR)} MB.`,
              code: 'file-too-large'
            }
          ]
        });
      } else if (acceptedFileTypes && !acceptedFileTypes.includes(file.type as FileMimeTypesOrExtensions)) {
        rejectedFiles.push({
          file,
          errors: [
            {
              message: `Accepted file types are ${acceptedFileTypes.join(', ')}, received file ${
                file.name
              } which has type ${file.type}.`,
              code: ErrorCode.FileInvalidType
            }
          ]
        });
      } else {
        acceptedFiles.push(file);
      }
    });

    if (rejectedFiles.length) onFilesRejected?.(rejectedFiles);
    if (acceptedFiles.length) onFilesAdded(acceptedFiles, directory);
  };

  return { ...inputProps, onChange };
}

export default function useInputProps(props: CreateInputPropsProps) {
  const fileInputProps = createInputProps({ ...props, directory: false });
  const folderInputProps = createInputProps({ ...props, directory: true });
  return { fileInputProps, folderInputProps };
}
