import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { ReactNode } from "react";

type TooltipComponentProps = {
  content: string;
  icon: ReactNode;
  text: string;
  copy?: boolean;
};

const TooltipComponent = ({
  content,
  icon,
  text,
  copy,
}: TooltipComponentProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger className="flex gap-1 text-xs items-center">
          {icon} {text}
        </TooltipTrigger>
        <TooltipContent>
          <p
            className={`flex items-center gap-1 ${copy ? "cursor-pointer hover:opacity-70" : ""}`}
            onClick={() => copy && navigator.clipboard.writeText(content)}
          >
            {content}{" "}
            {copy && (
              <Copy
                className="cursor-pointer hover:text-white/80 transition-colors duration-300"
                size={10}
              />
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;
