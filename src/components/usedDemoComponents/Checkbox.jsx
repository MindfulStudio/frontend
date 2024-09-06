// "use client"

import { Checkbox } from "@/components/ui/checkbox";
import { RegisterPopover } from "./RegisterPopover";
import { useState } from "react";

export function CheckboxTherms({ ontoggle }) {
  // AGB aus json => TODO: json: AGB
  const agb = "Es gibt noch keine AGB.";

  const [acceptAGB, setAcceptAGB] = useState(false);

  const handleAcceptAGB = () => {
    setAcceptAGB(!acceptAGB);
    ontoggle(acceptAGB);
  };
  console.log(acceptAGB);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={acceptAGB} onClick={handleAcceptAGB} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        <RegisterPopover title={"AGB akzeptieren"} textPopover={agb} />
      </label>
    </div>
  );
}
