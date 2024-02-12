import UploadFile from "@/components/upload-file";
import { useFileUpdate } from "@/services/upload-file";
import { AxiosProgressEvent } from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>();

  const progressCallBack = (progressEvent: AxiosProgressEvent) => {
    let percentComplete = 0;
    if (progressEvent.total) {
      percentComplete = progressEvent.loaded / progressEvent.total;
      percentComplete = Math.floor(percentComplete * 100);
      setProgress(percentComplete);
    }
  };
  const {
    mutate: upload,
    isSuccess,
    isPending,
  } = useFileUpdate({ progressCallBack });

  useEffect(() => {
    if (isSuccess) {
      setSelectedFile(null);
      setProgress(null);
    }
  }, [isSuccess]);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };
  const send = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    upload(formData);
  };

  return (
    <>
      <div className="flex flex-col size-full justify-center items-center">
        <div className="size-3/6">
          <UploadFile
            uploading={isPending}
            file={selectedFile}
            onFileChange={handleFileChange}
          />
          {progress && (
            <div>
              <div className="text-md font-light">uploaded {progress} %</div>
              <progress
                className="progress progress-primary w-full"
                value={progress}
                max="100"
              ></progress>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              onClick={send}
              disabled={!selectedFile || isPending}
              className="btn btn-primary"
            >
              {isPending ? "Uploading..." : "Send File"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
