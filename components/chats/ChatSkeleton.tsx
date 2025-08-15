export const ChatSkeleton = () => {
  return (
    <div className="grid grid-cols-5 gap-5 animate-pulse">
      <div className="h-[650px] bg-neutral-200 rounded-2xl"></div>
      <div className="h-[650px] bg-neutral-200 rounded-2xl col-span-3"></div>
      <div className="h-[650px] bg-neutral-200 rounded-2xl"></div>
    </div>
  );
};
