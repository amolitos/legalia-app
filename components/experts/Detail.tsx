"use client";

import { useEffect } from "react";
import { notFound } from "next/navigation";
import { useNewChat } from "@/hooks/chats/create";
import { useAttachDocumentExpert } from "@/hooks/experts/attach";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CustomError } from "../CustomError";
import { UploadDialog } from "../documents/UploadDialog";
import { ExpertDocuments } from "./ExpertDocuments";
import { ExpertSkeleton } from "./ExpertSkeleton";
import { useGetExpert } from "@/hooks/experts/get";
import { EmptyItem } from "../EmptyItem";
import { Plus } from "lucide-react";
import { ExpertChats } from "./ExpertChats";

export const Detail = ({ id }: { id: string }) => {
  const { expert, loading, error, handleFetch } = useGetExpert(id);
  const { handleAttach } = useAttachDocumentExpert(id);
  const { handleNewChat } = useNewChat();

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRenderDetail = () => {
    if (loading) {
      return <ExpertSkeleton />;
    }

    if (error) {
      if (error.status === 404) return notFound();
      return <CustomError message={error.message} handleRetry={handleFetch} />;
    }

    if (!expert) return;

    return (
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-3xl">{expert.name}</h3>
          <Badge className="bg-[#004aad]">{expert.role}</Badge>
        </div>
        <p className="whitespace-pre-line text-lg text-neutral-500 line-clamp-3 mt-3">
          {expert.instructions}
        </p>
        <Tabs defaultValue="account" className="mt-8">
          <TabsList>
            <TabsTrigger value="account">Conocimiento</TabsTrigger>
            <TabsTrigger value="chats">Chats</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-5">
            <UploadDialog handleAction={handleAttach} onResolve={handleFetch} />
            {expert.base_documents.length > 0 ? (
              <div className="mt-5">
                <ExpertDocuments documents={expert.base_documents} />
              </div>
            ) : (
              <EmptyItem>El experto aún no tiene conocimiento...</EmptyItem>
            )}
          </TabsContent>
          <TabsContent value="chats" className="mt-5">
            <Button onClick={() => handleNewChat(id)}>
              <Plus />
              Nuevo Chat
            </Button>
            {expert.chats.length > 0 ? (
              <div className="mt-5">
                <ExpertChats chats={expert.chats} />
              </div>
            ) : (
              <EmptyItem>
                Aún no tienes interacciones con el experto...
              </EmptyItem>
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return handleRenderDetail();
};
