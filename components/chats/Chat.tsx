"use client";

import { CustomError } from "../CustomError";
import { ChatMessages } from "./ChatMessages";
import { ChatSkeleton } from "./ChatSkeleton";
import { ChatKnowledge } from "./ChatKnowledge";
import { useGetChatById } from "@/hooks/useChat";
import { ChatProvider } from "./ChatProvider";

export const Chat = ({ id }: { id: number }) => {
  const { chat, messages, isLoading, error, getChat } = useGetChatById(id);

  const handleRenderChat = () => {
    if (isLoading) {
      return <ChatSkeleton />;
    }

    if (error) {
      <CustomError message={error.message} handleRetry={getChat} />;
    }

    return (
      <ChatProvider
        chatId={id}
        defaultDocuments={chat?.context_documents ?? []}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <ChatKnowledge />
          <div className="md:col-span-2 lg:col-span-3">
            <ChatMessages
              id={id}
              title={chat?.title}
              expert={chat?.expert.name}
              messages={messages}
            />
          </div>
        </div>
      </ChatProvider>
    );
  };

  return handleRenderChat();
};
