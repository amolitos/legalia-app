import { Response } from "../ai-elements/response";

export const AnswerText = ({ content }: { content: string }) => {
  return <Response>{content}</Response>;
};
