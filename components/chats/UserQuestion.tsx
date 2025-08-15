import React from "react";

export const UserQuestion = ({ message }: { message: string }) => {
  return (
    <div className="w-fit max-w-2/3 bg-primary/10 rounded-2xl rounded-br-none ml-auto p-4 mb-1">
      {message}
    </div>
  );
};
