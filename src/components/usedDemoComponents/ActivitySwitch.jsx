import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useState } from "react";

export function ActivitySwitch({}) {
  const [isActive, setIsActive] = useState(false);

  const handleSwitchChange = (checked) => {
    setIsActive(checked);
    if (onChange) {
      onChange(checked);
    }
  };

  const id = "activity-switch"; //

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        //TODO: if  activity for that day already exists (because of other checkins before), check its boolean; otherwise: false:
        checked={isActive}
        onCheckedChange={() => handleSwitchChange(!isActive)}
      />

      <Label htmlFor={id}>{isActive ? "Ja" : "Nein"}</Label>
    </div>
  );
}
