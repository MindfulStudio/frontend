import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useState } from "react";

export function ActivitySwitch({}) {
  const [isActive, setIsActive] = useState(false);
  const switchId = "activityswitch";

  const handleSwitchChange = (checked) => {
    setIsActive(checked);
    console.log("Activity:", isActive);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Switch
        id={switchId}
        checked={isActive}
        onCheckedChange={() => handleSwitchChange(!isActive)}
      />

      <Label htmlFor={switchId}>{isActive ? "Ja" : "Nein"}</Label>
    </div>
  );
}
