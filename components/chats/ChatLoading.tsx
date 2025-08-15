import { Loader } from "lucide-react";

export const ChatLoading = () => {
  return (
    <div className="flex items-center text-blue-600 gap-2 animate-bounce my-5">
      <Loader className="animate-spin" />
      <span className="font-medium">Pensando...</span>
    </div>
  );
};
