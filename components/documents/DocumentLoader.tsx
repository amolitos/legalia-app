import { RefreshCcwDot } from "lucide-react";
import React from "react";

export const DocumentLoader = () => {
  return (
    <div className="size-9 flex items-center justify-center">
      <RefreshCcwDot size={15} className="animate-spin" />
    </div>
  );
};
