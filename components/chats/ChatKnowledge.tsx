import { useState } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ConfirmDialog } from "../ConfirmDialog";
import { CircleX, RefreshCcwDot } from "lucide-react";
import { UploadDialog } from "../documents/UploadDialog";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useChatKnowledge } from "@/hooks/useChat";
import { ChatSearch } from "./ChatSearch";
import { Document } from "@/lib/types";

export const ChatKnowledge = ({
  id,
  defaultDocuments,
}: {
  id: number;
  defaultDocuments: Document[];
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Document | null>(null);
  const { documents, attachDocument, detachDocument } = useChatKnowledge(
    id,
    defaultDocuments
  );

  const total = documents.length;

  return (
    <Card className="gap-3">
      <CardHeader className="font-semibold">Conocimiento</CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 [&>*]:flex-1">
          <UploadDialog onResolve={attachDocument} />
          <ChatSearch />
        </div>
        <div className="my-5">
          <div className="flex justify-between text-sm mb-1">
            <span>Límite</span>
            <span>{total}/10</span>
          </div>
          <Progress value={total > 0 ? total * 10 : 0} />
        </div>
        <ConfirmDialog
          modal={modal}
          setModal={setModal}
          message={`¿Seguro que quieres eliminar ${selectedItem?.original_filename}?`}
          handleResolve={() => detachDocument(selectedItem!.id)}
        />
        <div className="flex flex-col gap-3">
          {documents?.map((doc) => (
            <div
              key={doc.id}
              className="border border-neutral-200 flex items-center rounded-md cursor-pointer py-1 px-2"
            >
              <p className="flex-1 font-medium text-sm line-clamp-1">
                {doc.original_filename}
              </p>
              {doc.ocr_status == "COMPLETED" ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedItem(doc);
                    setModal(true);
                  }}
                >
                  <CircleX />
                </Button>
              ) : (
                <div className="size-9 flex items-center justify-center">
                  <RefreshCcwDot size={15} className="animate-spin" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
