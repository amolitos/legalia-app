import React from "react";

export const TableSkeleton = () => {
  return (
    <div className="animate-pulse my-20">
      <div className="grid grid-cols-5 gap-3">
        <div className="h-4 bg-neutral-200 rounded-2xl"></div>
        <div className="h-4 bg-neutral-200 rounded-2xl"></div>
        <div className="h-4 bg-neutral-200 rounded-2xl"></div>
        <div className="h-4 bg-neutral-200 rounded-2xl"></div>
        <div className="h-4 bg-neutral-200 rounded-2xl"></div>
      </div>
      <div className="flex flex-col gap-5 mt-8">
        <hr />
        <div className="h-4 bg-neutral-200 rounded-2xl"></div>
        <hr />
        <div className="h-4 bg-neutral-200 rounded-2xl"></div>
        <hr />
        <div className="h-4 bg-neutral-200 rounded-2xl"></div>
        <hr />
        <div className="h-4 bg-neutral-200 rounded-2xl"></div>
      </div>
    </div>
  );
};
