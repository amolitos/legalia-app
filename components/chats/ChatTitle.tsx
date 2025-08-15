import { useUpdateChat } from "@/hooks/useChat";
import { useState, ChangeEvent, KeyboardEvent } from "react";

export const ChatTitle = ({
  id,
  defaultTitle,
}: {
  id: number;
  defaultTitle?: string;
}) => {
  const [title, setTitle] = useState(defaultTitle);
  const { isLoading, updateChat } = useUpdateChat(id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      if (title) updateChat(title);
      else setTitle(defaultTitle);
    }
  };

  return (
    <div className="flex items-center">
      <input
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        type="text"
        maxLength={150}
        className="flex-1 px-1"
      />
    </div>
  );
};
