import { ReactNode } from "react";

export const AnswerContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="py-5 animate-in fade-in-0 slide-in-from-top-5 duration-700 ease-out">
      {children}
    </div>
  );
};
