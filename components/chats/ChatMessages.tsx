"use client";

import { useEffect, useRef } from "react";
import { useQueryChat } from "@/hooks/chats/query";
import { FieldValues, useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { AnswerItem } from "./AnswerItem";
import { QuestionItem } from "./QuestionItem";
import { AlertCircleIcon, Loader, SendHorizontal } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

export interface ChatItem {
  type: string;
  message: string;
}

export const ChatMessages = ({
  id,
  title,
  expert,
  messages,
}: {
  id: string;
  title?: string;
  expert?: string;
  messages?: ChatItem[];
}) => {
  const chatRef = useRef<HTMLDivElement>(null);

  const { chat, loading, error, handleSubmitQuestion } = useQueryChat(
    id,
    messages
  );
  const { handleSubmit, setValue, reset, watch } = useForm();
  const question = watch("question");

  const onSubmit = async (data: FieldValues) => {
    reset({ question: "" });
    await handleSubmitQuestion(data);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  const handleRenderChat = () => {
    if (chat.length > 0) {
      return chat.map((item: ChatItem, index) => {
        if (item.type == "question") {
          return <QuestionItem key={index} message={item.message} />;
        }
        if (item.type == "answer") {
          return <AnswerItem key={index} message={item.message} />;
        }
      });
    }

    return (
      <div className="h-full flex items-center justify-center">
        <h6 className="font-medium text-2xl bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
          {expert}
        </h6>
      </div>
    );
  };

  return (
    <Card className="gap-3">
      <CardHeader className="font-semibold">{title}</CardHeader>
      <CardContent className="relative">
        <div
          ref={chatRef}
          className="h-[calc(100vh-252px)] overflow-scroll mb-16 -mr-6 pr-6"
        >
          {handleRenderChat()}
          {loading && (
            <div className="flex items-center text-blue-600 gap-2 animate-bounce my-5">
              <Loader className="animate-spin" />
              <span className="font-medium">Pensando...</span>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute bottom-0 left-6 right-6 bg-white flex items-center gap-3 rounded-2xl border border-neutral-300 p-3 z-20"
        >
          <TextareaAutosize
            value={question}
            onChange={(e) => setValue("question", e.target.value)}
            maxRows={5}
            placeholder={`Pregunta a ${expert}`}
            className="w-full outline-0 resize-none px-2"
          />
          <Button disabled={loading} type="submit" className="rounded-full w-9">
            <SendHorizontal />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
