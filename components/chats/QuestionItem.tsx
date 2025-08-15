import React from "react";

export const QuestionItem = ({ message }: { message: string }) => {
  return (
    <div className="w-fit bg-blue-500/10 text-right rounded-3xl ml-auto p-4">
      {message}
    </div>
  );
};
