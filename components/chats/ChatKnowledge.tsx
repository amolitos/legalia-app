import { useEffect, useState } from "react";
import { useKnowledgeChat } from "@/hooks/chats/knowledge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ConfirmDialog } from "../ConfirmDialog";
import { UploadDialog } from "../documents/UploadDialog";
import { CircleX } from "lucide-react";
import { Document } from "@/lib/types";
import { ChatSearch } from "./ChatSearch";

export const ChatKnowledge = ({ id }: { id: string }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Document | null>(null);
  const { documents, handleFetch, handleAttach, handleDetach } =
    useKnowledgeChat(id);
  const total = documents.length;

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="gap-3">
      <CardHeader className="font-semibold">Fuentes</CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 [&>*]:flex-1">
          <UploadDialog handleAction={handleAttach} onResolve={handleFetch} />
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
          handleResolve={() => handleDetach(`${selectedItem?.id}`)}
        />
        <div className="flex flex-col gap-3">
          {documents?.map((doc) => (
            <div
              key={doc.id}
              className="border border-neutral-200 flex items-center rounded-md cursor-pointer py-1 px-2"
            >
              <p className="font-medium text-sm mr-auto">
                {doc.original_filename}
              </p>
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
