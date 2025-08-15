"use client";

import { useCallback, useRef, useState } from "react";
import { CredentialsResponse } from "@/lib/types";
import axios, { CancelTokenSource } from "axios";
import { FileWithPath } from "react-dropzone";
import { useApi } from "./useApi";

export const useUploadDocument = ({
  onUploadEvent,
}: {
  onUploadEvent?: (id: number) => void;
}) => {
  const [status, setStatus] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);

  const { post } = useApi();

  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const handleUpload = useCallback(
    async (files: FileWithPath[]) => {
      setStatus("Preparando archivo...");
      setError(null);

      try {
        const res = await post<CredentialsResponse>(`/documents/upload-url`, {
          filename: files[0].name,
          content_type: files[0].type,
        });

        const { upload_url, document_id } = res;

        setStatus("Subiendo archivo...");
        cancelTokenSource.current = axios.CancelToken.source();

        await axios.put(upload_url, files[0], {
          headers: { "Content-Type": files[0].type },
          cancelToken: cancelTokenSource.current.token,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        });

        setStatus(null);
        setUploadProgress(0);
        if (onUploadEvent) onUploadEvent(document_id);
      } catch (err) {
        setError(err as Error);
        setStatus(null);
        setUploadProgress(0);
      }
    },
    [post, onUploadEvent]
  );

  const handleCancel = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Subida cancelada por el usuario.");
    }
  };

  return {
    status,
    uploadProgress,
    error,
    handleUpload,
    handleCancel,
  };
};
