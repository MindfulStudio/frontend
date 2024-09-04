import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverDots({
  title,
  titlePopover,
  descriptionPopover,
  textPopover,
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* title => content of the button that opens the popover */}
        <Button variant="extend">{title}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 ">
        <div className="grid gap-4">
          <div>
            {/* titlePopover =>  heading popover*/}
            <h4 className="font-medium leading-none">{titlePopover}</h4>
            <p className="text-sm text-muted-foreground">
              {/* descriptionPopover =>  short text in popover*/}
              {descriptionPopover}
            </p>

            {/* textPopover => small text / tags / single feelings displayed in popover */}
            <div className="text-sm">
              {textPopover.split(",").map((item, index) => {
                const comma =
                  index < textPopover.split(",").length - 1 ? ", " : ""; // wenn array leer (length -1), dann kein Komme am Ende, sonst Komma
                return (
                  <span
                    key={index}
                    className="inline-block"
                    style={{ marginLeft: "0.2rem" }}
                  >
                    {item}
                    {comma}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
