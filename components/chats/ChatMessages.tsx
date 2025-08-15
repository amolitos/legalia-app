"use client";

import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { AnswerItem } from "./AnswerItem";
import { QuestionItem } from "./QuestionItem";
import TextareaAutosize from "react-textarea-autosize";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, FileText, SendHorizontal } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useNotification } from "@/hooks/useNotification";
import { getModePlaceholder } from "@/lib/chat";
import { useChatQuery } from "@/hooks/useChat";
import { ChatLoading } from "./ChatLoading";
import { ChatTaskLog } from "./ChatTaskLog";
import GradientText from "../GradientText";
import { ChatQuery } from "@/lib/types";
import { ChatTitle } from "./ChatTitle";

export interface ChatItem {
  type: string;
  message: string;
}

export interface TaskNotification {
  chat_message_id: string;
  status: string;
  message: string;
  metadata: string;
}

export const ChatMessages = ({
  id,
  title,
  expert,
  messages,
}: {
  id: number;
  title?: string;
  expert?: string;
  messages?: ChatItem[];
}) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<string | undefined>(undefined);
  const {
    chatItems,
    isLoading,
    error,
    askQuestion,
    createDocument,
    addToChatItems,
    taskLog,
    setTaskLog,
  } = useChatQuery(id, messages);
  const { handleSubmit, setValue, reset, watch } = useForm<ChatQuery>();
  const question = watch("question");

  useNotification({
    event: "doc_update",
    callback: (msg) => {
      const data = JSON.parse(msg) as TaskNotification;
      if (data.status == "TASK_FINISHED") {
        setTaskLog([]);
        addToChatItems("answer", data.metadata);
      }
      if (data.status == "TASK_UPDATE") {
        setTaskLog((t) => [...t, data]);
      }
    },
  });

  const onSubmit: SubmitHandler<ChatQuery> = async (data) => {
    reset({ question: "" });
    if (mode == "document") {
      await createDocument(data);
    } else {
      await askQuestion(data);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatItems]);

  const handleRenderChat = () => {
    if (chatItems.length > 0) {
      return chatItems.map((item: ChatItem, index) => {
        if (item.type == "question") {
          return <QuestionItem key={index} message={item.message} />;
        }
        if (item.type == "answer" && item.message) {
          return <AnswerItem key={index} message={item.message} />;
        }
      });
    }

    return (
      <div className="h-[calc(100vh-345px)] flex items-center justify-center">
        <GradientText
          colors={["#3b82f6", "#06b6d4", "#0a0a0a"]}
          animationSpeed={3}
          className="font-medium text-2xl text-center"
        >
          {expert}
        </GradientText>
      </div>
    );
  };

  return (
    <Card className="gap-3">
      <CardHeader className="font-semibold">
        <ChatTitle id={id} defaultTitle={title} />
      </CardHeader>
      <CardContent className="relative">
        <div
          ref={chatRef}
          className="h-[calc(100vh-184px)] overflow-scroll [&>*:last-child]:mb-40 -mr-6 pr-6"
        >
          {handleRenderChat()}
          {isLoading && <ChatLoading />}
          {taskLog.length > 0 && <ChatTaskLog taskLog={taskLog} />}
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute bottom-0 left-6 right-6 bg-white rounded-2xl border border-neutral-300 p-3 pt-5 z-20"
        >
          <TextareaAutosize
            value={question}
            onChange={(e) => setValue("question", e.target.value)}
            maxRows={3}
            placeholder={`${getModePlaceholder(mode)}${expert}.`}
            className="w-full outline-0 resize-none px-2"
          />
          <div className="flex items-center gap-3 mt-3">
            <ToggleGroup
              type="single"
              size="lg"
              onValueChange={(v) => setMode(v)}
            >
              <ToggleGroupItem
                value="document"
                className="data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600"
              >
                <FileText /> Documento
              </ToggleGroupItem>
            </ToggleGroup>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-9 rounded-full ml-auto"
            >
              <SendHorizontal />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
