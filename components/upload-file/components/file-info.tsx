import React, { FC } from "react";
import { FileInfoProps } from "../type";
import Close from "../icons/close";
import Image from "next/image";

const FileInfo: FC<FileInfoProps> = ({ file, deleteFile, uploading }) => {
  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };
  const extractFileName = (fileName: string) => {
    return fileName.split(".")[0];
  };

  const getFileImage = () => {
    const fileType = file.type;
    const fileTypeToImage: any = {
      pdf: "/pdf.png",
      image: "/image.png",
    };
    const defaultImage = "/file.png";
    for (const key in fileTypeToImage) {
      if (fileType.includes(key)) {
        return fileTypeToImage[key];
      }
    }
    return defaultImage;
  };

  return (
    <div className="relative flex flex-col  bg-blue-300/30 rounded-2xl">
      {!uploading && (
        <div
          className="absolute right-0 m-2 cursor-pointer"
          onClick={deleteFile}
        >
          <Close />
        </div>
      )}
      <div className="flex items-center p-4">
        <Image alt="file" src={getFileImage()} width={"50"} height={"50"} />
        <div className="ml-2">
          <span className="font-medium"> {extractFileName(file.name)} </span>
          <br />
          <span className="text-gray-500 text-md">{formatSize(file.size)}</span>
        </div>
      </div>
    </div>
  );
};

export default FileInfo;
