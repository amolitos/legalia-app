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
import { useUploadDocument } from "@/hooks/useUpload";
import { Plus, Upload } from "lucide-react";
import { Progress } from "../ui/progress";

export function UploadDialog({
  onResolve,
}: {
  onResolve: (documentId: number) => Promise<void>;
}) {
  const [modal, setModal] = useState(false);
  const { status, uploadProgress, error, handleUpload } = useUploadDocument({
    onUploadEvent: async (id) => {
      await onResolve(id);
      setModal(false);
    },
  });
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "application/image": [".jpg", ".jpeg", ".png"],
      "application/audio": [".mp3"],
      "application/video": [".mp4"],
    },
    onDrop: async (files) => {
      handleUpload(files);
    },
  });

  const handleRenderContent = () => {
    if (status) {
      return (
        <div>
          <h4 className="text-neutral-600 text-center mb-2">{status}</h4>
          <Progress value={uploadProgress} max={100} />
        </div>
      );
    }

    if (error) {
      return (
        <CustomError
          message={error.message}
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
        <div className="w-14 h-14 bg-neutral-200 flex items-center justify-center rounded-full mx-auto">
          <Upload className="text-primary" />
        </div>
        <p className="font-medium text-neutral-500 text-center mt-5">
          Arrastra y suelta o{" "}
          <span className="text-primary">elige un archivo</span> para subirlo
        </p>
        <p className="text-sm text-neutral-500 text-center mt-8">
          Tipos de archivos admitidos: pdf, jpg, jpeg, png, mp3, mp4
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
        aria-describedby="Upload Dialog"
        showCloseButton={false}
        onEscapeKeyDown={() => {
          if (status) return;
          setModal(false);
        }}
        onInteractOutside={() => {
          if (status) return;
          setModal(false);
        }}
        className="lg:max-w-2/3"
      >
        <DialogHeader>
          <DialogTitle>Agregar conocimiento</DialogTitle>
        </DialogHeader>
        {handleRenderContent()}
      </DialogContent>
    </Dialog>
  );
}
