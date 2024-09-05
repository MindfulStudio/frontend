// "use client"

import { Checkbox } from "@/components/ui/checkbox";
import { RegisterPopover } from "./RegisterPopover";

export function CheckboxTherms() {
  // AGB aus json => TODO: json: AGB
  const agb = "Es gibt noch keine AGB.";

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        <RegisterPopover title={"AGB akzeptieren"} textPopover={agb} />
      </label>
    </div>
  );
}
