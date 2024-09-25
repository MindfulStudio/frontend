import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function RegisterPopover({
  title,
  titlePopover,
  descriptionPopover,
  contentPopover,
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* title => content of the button that opens the popover */}
        <Button variant="link" className="pl-0 pr-0">
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-96 overflow-auto p-4">
        <div className="grid gap-4">
          <div>
            {/* titlePopover =>  heading popover*/}
            <h4 className="font-medium leading-none">{titlePopover}</h4>
            <p className="text-sm text-muted-foreground">
              {/* descriptionPopover =>  short text in popover*/}
              {descriptionPopover}
            </p>

            {/* contentPopover => small text / tags / single feelings displayed in popover */}
            {contentPopover}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
