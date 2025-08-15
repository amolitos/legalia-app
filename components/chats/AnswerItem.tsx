import { useState } from "react";
import { toast } from "sonner";
import { ButtonIcon } from "../ButtonIcon";
import { Response } from "../ai-elements/response";
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";

export const AnswerItem = ({ message }: { message: string }) => {
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);

  const handleCopyClipboard = async () => {
    await navigator.clipboard.writeText(message);
    toast("Se copió en el portapapeles.", { position: "bottom-center" });
  };

  const handleToggleThumbs = (isUp: boolean) => {
    setThumbsUp(isUp);
    setThumbsDown(!isUp);
  };

  return (
    <div className="py-5 px-3 animate-in fade-in-0 slide-in-from-top-5 duration-700 ease-out">
      <Response>{message}</Response>
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
    </div>
  );
};
