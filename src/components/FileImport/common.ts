/**
 * Common file MIME types, or extensions for plain text files that do not have MIME types.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
export enum FileMimeTypesOrExtensions {
  GIF = 'image/gif',
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  PDF = 'application/pdf',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  NONE = '',
  MD = 'text/markdown'
}

/** Used to render helper text for UI that needs to show which file extensions are accepted */
export const FILE_MIME_TYPE_EXTENSIONS: Record<FileMimeTypesOrExtensions, string[]> = {
  [FileMimeTypesOrExtensions.GIF]: ['gif'],
  [FileMimeTypesOrExtensions.PNG]: ['png'],
  [FileMimeTypesOrExtensions.JPEG]: ['jpeg', 'jpg'],
  [FileMimeTypesOrExtensions.PDF]: ['pdf'],
  [FileMimeTypesOrExtensions.DOCX]: ['docx'],
  [FileMimeTypesOrExtensions.NONE]: [],
  [FileMimeTypesOrExtensions.MD]: ['md']
};

export const MB_SCALE_FACTOR = 1024 * 1024;
