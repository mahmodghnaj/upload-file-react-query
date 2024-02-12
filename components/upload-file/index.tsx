import React, { useState, DragEvent, ChangeEvent, FC } from "react";
import IconUploadFile from "./icons/icon-upload-file";
import { UploadFileProps } from "./type";
import FileInfo from "./components/file-info";

const UploadFile: FC<UploadFileProps> = ({ onFileChange, file, uploading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file: File | null) => {
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setErrorMessage(
          "File size exceeds 25MB. Please choose a smaller file."
        );
        onFileChange(null);
      } else {
        setErrorMessage(null);
        onFileChange(file);
      }
    }
  };

  return (
    <>
      <div
        className={`size-full flex flex-col ${
          file && "justify-center bg-blue-50/70 rounded-3xl px-4"
        }`}
      >
        {file && (
          <FileInfo
            uploading={uploading}
            deleteFile={() => onFileChange(null)}
            file={file}
          />
        )}
        {!file && (
          <>
            <div className="flex-1">
              <div className="text-center mb-3 text-md font-medium text-red-500">
                {errorMessage && errorMessage}
              </div>
              <div
                className={`border-4 border-dotted size-full rounded-xl flex flex-col justify-center text-center items-center ${
                  isDragging
                    ? "bg-blue-200 border-blue-500 opacity-70"
                    : "border-gray-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <IconUploadFile />
                <div className="font-bold">
                  Drag and Drop file here or &nbsp;
                  <label className="underline cursor-pointer font-bold underline-offset-[4px] decoration-2">
                    choose file
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-gray-500 mt-3 text-sm">
              <div>Supported Files and Images</div>
              <div> Maximum Size: 25MB</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UploadFile;
