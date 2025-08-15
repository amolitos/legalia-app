import React from "react";

export const QuestionItem = ({ message }: { message: string }) => {
  return (
    <div className="w-fit max-w-2/3 bg-blue-500/10 rounded-3xl ml-auto p-4">
      {message}
    </div>
  );
};
