import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const ButtonIcon = ({
  children,
  tooltip,
  handleAction,
}: {
  children: React.ReactNode;
  tooltip: string;
  handleAction: () => void;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleAction}
          variant="ghost"
          size="icon"
          className="size-8"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p className="font-semibold">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
