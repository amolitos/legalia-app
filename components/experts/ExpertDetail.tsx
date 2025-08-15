"use client";

import { Button } from "../ui/button";
import { ExpertForm } from "./ExpertForm";
import { CustomError } from "../CustomError";
import { ExpertSkeleton } from "./ExpertSkeleton";
import { ExpertKnowledge } from "./ExpertKnowledge";
import { Plus } from "lucide-react";
import { useCreateChat } from "@/hooks/useChat";
import { useGetExpertById } from "@/hooks/useExpert";

export const ExpertDetail = ({ id }: { id: number }) => {
  const { expert, isLoading, error, getExpert } = useGetExpertById(id);
  const { createChat, isLoading: isLoadingNewChat } = useCreateChat();

  const handleRenderDetail = () => {
    if (isLoading) {
      return <ExpertSkeleton />;
    }

    if (error) {
      return <CustomError message={error.message} handleRetry={getExpert} />;
    }

    if (!expert) return;

    return (
      <>
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-2xl">Detalle Experto</h4>
          <Button onClick={() => createChat(id)} disabled={isLoadingNewChat}>
            <Plus />
            Nuevo Chat
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
          <ExpertForm expert={expert} />
          <ExpertKnowledge
            id={expert.id}
            defaultDocuments={expert.base_documents}
          />
        </div>
      </>
    );
  };

  return handleRenderDetail();
};
