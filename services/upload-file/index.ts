import { api } from "@/lib/axios/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosProgressEvent } from "axios";

export interface UseMutationUploadFileVariables {
  progressCallBack?: (progressEvent: AxiosProgressEvent) => void;
}

export const useFileUpdate = (variables: UseMutationUploadFileVariables) =>
  useMutation({
    mutationFn: (body: any) => {
      return api.post("upload", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (p: AxiosProgressEvent) => {
          variables.progressCallBack && variables.progressCallBack(p);
        },
      });
    },
  });
