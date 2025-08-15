import { useState } from "react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Document } from "@/lib/types";
import { ConfirmDialog } from "../ConfirmDialog";
import { UploadDialog } from "../documents/UploadDialog";
import { useExpertKnowledge } from "@/hooks/useExpert";
import { formatBytes, getMimeType } from "@/lib/files";
import { EmptyItem } from "../EmptyItem";
import { useNotification } from "@/hooks/useNotification";

export const ExpertKnowledge = ({
  id,
  defaultDocuments,
}: {
  id: number;
  defaultDocuments: Document[];
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Document | null>(null);
  const { documents, getDocuments, attachDocument, detachDocument } =
    useExpertKnowledge(id, defaultDocuments);
  useNotification(getDocuments);

  return (
    <div className="border border-neutral-200 rounded-2xl p-5">
      <Label className="mb-1">Conocimiento</Label>
      <p className="text-neutral-400 mb-5">
        Las fuentes en las cuales el experto basará sus respuestas.
      </p>
      <UploadDialog onResolve={attachDocument} />
      <ConfirmDialog
        modal={modal}
        setModal={setModal}
        message={`¿Seguro que quieres eliminar ${selectedItem?.original_filename}?`}
        handleResolve={() => detachDocument(selectedItem!.id)}
      />
      {documents.length > 0 ? (
        <div className="mt-5">
          {documents.map((doc: Document) => (
            <div
              key={doc.id}
              onClick={() => {
                setSelectedItem(doc);
                setModal(true);
              }}
              className="rounded-lg cursor-pointer p-2 hover:bg-neutral-100"
            >
              <h6 className="font-semibold line-clamp-1">
                {doc.original_filename.toLowerCase()}
              </h6>
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    doc.ocr_status == "COMPLETED"
                      ? "bg-[#00ad82]"
                      : "bg-red-700"
                  }
                >
                  {doc.ocr_status.toLowerCase()}
                </Badge>
                <Badge variant="outline">{getMimeType(doc.mime_type)}</Badge>
                <Badge variant="outline">{formatBytes(doc.size_bytes)}</Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyItem>El experto aún no tiene conocimiento...</EmptyItem>
      )}
    </div>
  );
};
