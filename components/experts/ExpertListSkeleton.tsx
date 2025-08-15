import React from "react";

export const ExpertListSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="h-40 bg-neutral-200 rounded-2xl"></div>
        <div className="h-40 bg-neutral-200 rounded-2xl"></div>
        <div className="h-40 bg-neutral-200 rounded-2xl"></div>
        <div className="h-40 bg-neutral-200 rounded-2xl"></div>
        <div className="h-40 bg-neutral-200 rounded-2xl"></div>
        <div className="h-40 bg-neutral-200 rounded-2xl"></div>
        <div className="h-40 bg-neutral-200 rounded-2xl"></div>
        <div className="h-40 bg-neutral-200 rounded-2xl"></div>
        <div className="h-40 bg-neutral-200 rounded-2xl"></div>
      </div>
    </div>
  );
};
