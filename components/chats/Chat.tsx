"use client";

import { CustomError } from "../CustomError";
import { ChatMessages } from "./ChatMessages";
import { ChatSkeleton } from "./ChatSkeleton";
import { ChatKnowledge } from "./ChatKnowledge";
import { useGetChatById } from "@/hooks/useChat";
import { useNotification } from "@/hooks/useNotification";

export const Chat = ({ id }: { id: number }) => {
  const { chat, messages, isLoading, error, getChat } = useGetChatById(id);
  useNotification(getChat);

  const handleRenderChat = () => {
    if (isLoading) {
      return <ChatSkeleton />;
    }

    if (error) {
      <CustomError message={error.message} handleRetry={getChat} />;
    }

    return (
      <div className="grid grid-cols-4 gap-5">
        <ChatKnowledge
          id={id}
          defaultDocuments={chat?.context_documents ?? []}
        />
        <div className="col-span-3">
          <ChatMessages
            id={id}
            title={chat?.title}
            expert={chat?.expert.name}
            messages={messages}
          />
        </div>
      </div>
    );
  };

  return handleRenderChat();
};
