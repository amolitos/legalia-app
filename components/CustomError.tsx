import { OctagonAlert } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export const CustomError = ({
  message,
  handleRetry,
}: {
  message: string;
  handleRetry?: () => void;
}) => {
  return (
    <div className="bg-red-100 border border-red-800 rounded-2xl py-2 px-3">
      <div className="flex items-center gap-3 justify-between text-red-800">
        <div>
          <OctagonAlert />
        </div>
        <p className="font-medium line-clamp-1">{message}</p>
        <Button variant="destructive" onClick={() => handleRetry?.()}>
          Reintentar
        </Button>
      </div>
    </div>
  );
};
