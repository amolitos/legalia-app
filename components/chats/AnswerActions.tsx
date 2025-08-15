import { useState } from "react";
import { toast } from "sonner";
import { ButtonIcon } from "../ButtonIcon";
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import { ChatMessage } from "@/lib/types";

export const AnswerActions = ({ item }: { item: ChatMessage }) => {
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);

  const handleCopyClipboard = async () => {
    await navigator.clipboard.writeText(item.answer);
    toast("Se copió en el portapapeles.", { position: "bottom-center" });
  };

  const handleToggleThumbs = (isUp: boolean) => {
    setThumbsUp(isUp);
    setThumbsDown(!isUp);
  };

  return (
    <div className="flex items-center mt-3">
      <ButtonIcon tooltip="Copiar texto" handleAction={handleCopyClipboard}>
        <Copy />
      </ButtonIcon>
      <ButtonIcon
        tooltip="La respuesta es correcta"
        handleAction={() => handleToggleThumbs(true)}
      >
        <ThumbsUp className={thumbsUp ? "fill-primary" : ""} />
      </ButtonIcon>
      <ButtonIcon
        tooltip="La respuesta es incorrecta"
        handleAction={() => handleToggleThumbs(false)}
      >
        <ThumbsDown className={thumbsDown ? "fill-primary" : ""} />
      </ButtonIcon>
    </div>
  );
};
