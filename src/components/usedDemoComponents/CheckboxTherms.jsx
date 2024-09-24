// "use client"

import { Checkbox } from "@/components/ui/checkbox";
import { RegisterPopover } from "./RegisterPopover";
import { useState } from "react";
import agb from "@/legal/Agb.jsx";
import datenschutzrichtlinie from "@/legal/Datenschutzrichtlinie.jsx";

export function CheckboxTherms({ ontoggle, success }) {
  const [acceptAGB, setAcceptAGB] = useState(false);

  const handleAcceptAGB = () => {
    setAcceptAGB(!acceptAGB);
    ontoggle(acceptAGB);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={acceptAGB}
        onClick={handleAcceptAGB}
        disabled={success}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Ich akzeptiere die{" "}
        <RegisterPopover title={"AGB"} contentPopover={agb} /> und willige in
        die Verarbeitung meiner Daten gemäß{" "}
        <RegisterPopover
          title={"Datenschutzrichtlinie"}
          contentPopover={datenschutzrichtlinie}
        />{" "}
        ein.
      </label>
    </div>
  );
}
