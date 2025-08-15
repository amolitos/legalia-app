import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const DocumentName = ({ name }: { name: string }) => {
  return (
    <Tooltip delayDuration={700}>
      <TooltipTrigger className="flex-1 overflow-hidden cursor-pointer">
        <p className="font-medium text-sm text-left truncate">{name}</p>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={5}
        className="max-w-54 break-all text-sm py-1 px-3"
      >
        {name}
      </TooltipContent>
    </Tooltip>
  );
};
