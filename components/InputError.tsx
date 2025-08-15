import React from "react";

export const InputError = ({ message }: { message: string | undefined }) => {
  return (
    <p className="text-sm text-red-600 leading-none p-0 mt-1">{message}</p>
  );
};
