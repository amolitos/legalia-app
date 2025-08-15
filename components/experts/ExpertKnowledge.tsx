import { useState } from "react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Document } from "@/lib/types";
import { EmptyItem } from "../EmptyItem";
import { getMimeType } from "@/lib/files";
import { ConfirmDialog } from "../ConfirmDialog";
import { useExpertKnowledge } from "@/hooks/useExpert";
import { UploadDialog } from "../documents/UploadDialog";
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
  useNotification({ event: "ocr_update", callback: () => getDocuments() });

  return (
    <div className="border border-neutral-200 rounded-2xl shadow p-5">
      <Label className="mb-1">Conocimiento</Label>
      <p className="text-sm text-neutral-500 mb-5">
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
        <div className="max-h-56 overflow-scroll mt-5">
          {documents.map((doc: Document) => (
            <div
              key={doc.id}
              onClick={() => {
                setSelectedItem(doc);
                setModal(true);
              }}
              className="rounded-lg cursor-pointer p-2 hover:bg-neutral-100"
            >
              <h6 className="font-medium text-sm line-clamp-1">
                {doc.original_filename.toLowerCase()}
              </h6>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="outline">
                  <span
                    className={`size-1.5 rounded-full ${
                      doc.ocr_status == "COMPLETED"
                        ? "bg-[#00ad82]"
                        : "bg-red-700"
                    }`}
                    aria-hidden="true"
                  ></span>
                  {doc.ocr_status.toLowerCase()}
                </Badge>
                <Badge variant="outline">{getMimeType(doc.mime_type)}</Badge>
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
