"use client";

import { useEffect } from "react";
import { useGetChat } from "@/hooks/chats/get";
import { ChatMessages } from "./ChatMessages";
import { CustomError } from "../CustomError";
import { ChatSkeleton } from "./ChatSkeleton";
import { ChatKnowledge } from "./ChatKnowledge";
import { ChatFeatures } from "./ChatFeatures";

export const Chat = ({ id }: { id: string }) => {
  const { chat, messages, loading, error, handleFetch } = useGetChat(id);

  const handleRenderChat = () => {
    if (loading) {
      return <ChatSkeleton />;
    }

    if (error) {
      <CustomError message={error.message} handleRetry={handleFetch} />;
    }

    return (
      <div className="grid grid-cols-4 gap-5">
        <ChatKnowledge id={id} />
        <div className="col-span-2">
          <ChatMessages
            id={id}
            title={chat?.title}
            expert={chat?.expert.name}
            messages={messages}
          />
        </div>
        <ChatFeatures />
      </div>
    );
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return handleRenderChat();
};
