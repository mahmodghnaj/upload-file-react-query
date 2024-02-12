export interface UploadFileProps {
  onFileChange: (file: File | null) => void;
  file: File | null;
  uploading?: boolean;
}
export interface FileInfoProps {
  file: File;
  deleteFile: () => void;
  uploading?: boolean;
}
