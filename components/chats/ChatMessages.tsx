"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { AnswerText } from "./AnswerText";
import { UserQuestion } from "./UserQuestion";
import TextareaAutosize from "react-textarea-autosize";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  AlertCircleIcon,
  AudioLines,
  FileText,
  Scale,
  SendHorizontal,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useNotification } from "@/hooks/useNotification";
import { getModePlaceholder } from "@/lib/chat";
import { useChatQuery } from "@/hooks/useChat";
import { ChatLoading } from "./ChatLoading";
import { ChatTaskLog } from "./ChatTaskLog";
import GradientText from "../GradientText";
import { ChatMessage } from "@/lib/types";
import { ChatTitle } from "./ChatTitle";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../ai-elements/conversation";
import { useChatContext } from "./ChatProvider";
import { AnswerAudio } from "./AnswerAudio";
import { AudioPlayerProvider } from "react-use-audio-player";
import { AnswerActions } from "./AnswerActions";
import { AnswerContainer } from "./AnswerContainer";

export interface ChatPrompt {
  prompt: string;
}

export interface TaskNotification {
  chat_message_id: string;
  status: string;
  message: string;
  metadata: ChatMessage;
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
  messages?: ChatMessage[];
}) => {
  const [mode, setMode] = useState<string | undefined>(undefined);
  const {
    chatItems,
    currentTask,
    taskLog,
    error,
    askQuestion,
    legalSimulator,
    generateTask,
    addToChatItems,
    setTaskLog,
    setCurrentTask,
  } = useChatQuery(id, messages);
  const { handleSubmit, setValue, reset, watch } = useForm<ChatPrompt>();
  const { getDocuments } = useChatContext();
  const prompt = watch("prompt");

  useNotification({
    event: "task_generation",
    callback: (msg) => {
      const data = JSON.parse(msg) as TaskNotification;
      if (data.status == "TASK_FINISHED") {
        setCurrentTask(null);
        setTaskLog([]);
        addToChatItems(data.metadata);
        getDocuments();
      }
      if (data.status == "TASK_UPDATE") {
        setTaskLog((t) => [...t, data]);
      }
    },
  });

  const onSubmit: SubmitHandler<ChatPrompt> = async (data) => {
    if (!data.prompt || !data.prompt.trim()) return;
    reset({ prompt: "" });
    if (mode) {
      if (mode == "simulate") {
        await legalSimulator(data.prompt);
        return;
      }
      await generateTask(mode, data.prompt);
    } else {
      await askQuestion(data.prompt);
    }
  };

  const handleRenderChat = () => {
    if (chatItems.length > 0 || currentTask !== null) {
      return chatItems.map((item: ChatMessage) => {
        return (
          <div key={item.id}>
            <UserQuestion key={item.id} message={item.question} />
            {item.answer != null && (
              <AnswerContainer>
                {["text", "document"].includes(item.answer_type) && (
                  <AnswerText content={item.answer} />
                )}
                {item.answer_type === "audio" && (
                  <AnswerAudio chatId={id} message={item} />
                )}
                <AnswerActions item={item} />
              </AnswerContainer>
            )}
          </div>
        );
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
      <CardContent>
        <Conversation className="relative h-[calc(100vh-184px)] pb-28">
          <ConversationContent className="[&>*:last-child]:mb-12">
            <AudioPlayerProvider>{handleRenderChat()}</AudioPlayerProvider>
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            {currentTask !== null && <UserQuestion message={currentTask} />}
            {taskLog.length > 0 && (
              <ChatTaskLog task={mode ?? "Tarea"} taskLog={taskLog} />
            )}
            {currentTask !== null && <ChatLoading />}
          </ConversationContent>
          <ConversationScrollButton className="mb-28" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="absolute bottom-0 left-3 right-3 bg-white rounded-2xl border border-neutral-300 p-3 pt-5 z-20"
          >
            <TextareaAutosize
              value={prompt}
              onChange={(e) => setValue("prompt", e.target.value)}
              maxRows={3}
              placeholder={`${getModePlaceholder(mode)}${expert}.`}
              className="w-full outline-0 resize-none px-2"
            />
            <div className="flex items-center gap-3 mt-3">
              <ToggleGroup
                type="single"
                size="lg"
                spacing={1}
                onValueChange={(v) => setMode(v)}
              >
                <ToggleGroupItem
                  value="document"
                  className="data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600"
                >
                  <FileText /> Documento
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="audio"
                  className="data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600"
                >
                  <AudioLines /> Audio
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="simulate"
                  className="data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600"
                >
                  <Scale /> Simulador
                </ToggleGroupItem>
              </ToggleGroup>
              <Button
                disabled={currentTask !== null}
                type="submit"
                className="w-9 rounded-full ml-auto"
              >
                <SendHorizontal />
              </Button>
            </div>
          </form>
        </Conversation>
      </CardContent>
    </Card>
  );
};
