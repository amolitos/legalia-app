import React from "react";

export const ExpertSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-60 h-10 bg-neutral-200 rounded-2xl"></div>
      <div className="w-40 h-4 bg-neutral-200 rounded-2xl mt-2"></div>
      <div className="w-32 h-10 bg-neutral-200 rounded-2xl my-6"></div>
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
