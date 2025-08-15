import { useState } from "react";
import { Document } from "@/lib/types";
import { Progress } from "../ui/progress";
import { ChatSearch } from "./ChatSearch";
import { ConfirmDialog } from "../ConfirmDialog";
import { UploadDialog } from "../documents/UploadDialog";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useNotification } from "@/hooks/useNotification";
import { useDownloadTranscription } from "@/hooks/useDownload";
import { Download, EllipsisVertical, Trash2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DocumentIcon } from "../documents/DocumentIcon";
import { DocumentName } from "../documents/DocumentName";
import { DocumentLoader } from "../documents/DocumentLoader";
import { DocumentContainer } from "../documents/DocumentContainer";
import { useChatContext } from "./ChatProvider";

export const ChatKnowledge = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Document | null>(null);
  const { documents, getDocuments, attachDocument, detachDocument } =
    useChatContext();
  const { handleDownload } = useDownloadTranscription();
  useNotification({ event: "ocr_update", callback: () => getDocuments() });
  const total = documents.length;

  return (
    <Card className="gap-3">
      <CardHeader className="font-semibold">Conocimiento</CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-2 [&>*]:flex-1">
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
            <DocumentContainer key={doc.id}>
              <DocumentIcon mimeType={doc.mime_type} />
              <DocumentName name={doc.original_filename} />
              {doc.ocr_status == "COMPLETED" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="!ring-0">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    side="bottom"
                    sideOffset={-8}
                  >
                    <DropdownMenuItem onClick={() => handleDownload(doc.id)}>
                      <Download />
                      Transcripción
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => {
                        setSelectedItem(doc);
                        setModal(true);
                      }}
                    >
                      <Trash2Icon size={16} aria-hidden="true" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DocumentLoader />
              )}
            </DocumentContainer>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
