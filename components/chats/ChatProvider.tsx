"use client";

import { createContext, useContext, ReactNode } from "react";
import { useChatKnowledge } from "@/hooks/useChat";
import { Document } from "@/lib/types";

type ChatContextType = {
  documents: Document[];
  getDocuments: () => Promise<void>;
  attachDocument: (documentId: number) => Promise<void>;
  detachDocument: (documentId: number) => Promise<void>;
  isLoading: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({
  chatId,
  defaultDocuments,
  children,
}: {
  chatId: number;
  defaultDocuments: Document[];
  children: ReactNode;
}) => {
  const { documents, getDocuments, attachDocument, detachDocument, isLoading } =
    useChatKnowledge(chatId, defaultDocuments);

  return (
    <ChatContext.Provider
      value={{
        documents,
        getDocuments,
        attachDocument,
        detachDocument,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext debe ser usado dentro de un ChatProvider");
  }
  return context;
};
