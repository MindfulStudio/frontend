import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useCheckinContext } from "@/utils/CheckinProvider";

export function ActivitySwitch({}) {
  const switchId = "activityswitch";

  const { isActive, setIsActive } = useCheckinContext();

  const handleSwitchChange = (checked) => {
    setIsActive(checked);
    console.log("Activity:", isActive); // for debugging
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-1 mb-1">
      <Switch
        id={switchId}
        checked={isActive}
        onCheckedChange={() => handleSwitchChange(!isActive)}
      />

      <Label /* className="text-md" */ htmlFor={switchId}>
        {isActive ? "Ja" : "Nein"}
      </Label>
    </div>
  );
}
