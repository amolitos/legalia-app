"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CustomError } from "../CustomError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUploadDocument } from "@/hooks/documents/upload";
import { Plus, Upload } from "lucide-react";

export function UploadDialog({
  handleAction,
  onResolve,
}: {
  handleAction: (documentId: string) => Promise<void>;
  onResolve: () => void;
}) {
  const [modal, setModal] = useState(false);
  const { loading, error, handleUpload } = useUploadDocument({
    onUploadEvent: async (id) => {
      await handleAction(id);
      setModal(false);
      onResolve();
    },
  });
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "application/image": [".jpg", ".jpeg", ".png"],
      "application/video": [".mp4"],
    },
    onDrop: async (files) => {
      handleUpload(files);
    },
  });

  const handleRenderContent = () => {
    if (loading) {
      return <h4 className="text-center font-semibold">Cargando...</h4>;
    }

    if (error) {
      return (
        <CustomError
          message={error}
          handleRetry={() => handleUpload([...acceptedFiles])}
        />
      );
    }

    return (
      <div
        {...getRootProps()}
        className="bg-neutral-50 rounded-xl border border-dashed border-neutral-200 p-20"
      >
        <input {...getInputProps()} />
        <div className="w-14 h-14 bg-blue-100 flex items-center justify-center rounded-full mx-auto">
          <Upload className="text-blue-600" />
        </div>
        <p className="font-medium text-neutral-500 text-center mt-5">
          Arrastra y suelta o{" "}
          <span className="text-blue-600">elige un archivo</span> para subirlo
        </p>
        <p className="text-sm text-neutral-500 text-center mt-8">
          Tipos de archivos admitidos: pdf, jpg, png, audio, etc.
        </p>
      </div>
    );
  };

  return (
    <Dialog open={modal}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setModal(true)}
          variant="outline"
          className="rounded-full"
        >
          <Plus />
          Agregar
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={() => setModal(false)}
        className="max-w-2/3"
      >
        <DialogHeader>
          <DialogTitle>Agregar conocimiento</DialogTitle>
        </DialogHeader>
        <p className="text-neutral-600">
          El conocimiento permite que tu Experto base sus respuestas en la
          información que tu le compartes.
        </p>
        {handleRenderContent()}
      </DialogContent>
    </Dialog>
  );
}
