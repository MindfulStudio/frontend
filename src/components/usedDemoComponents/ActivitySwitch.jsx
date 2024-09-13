import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useUserContext } from "@/utils/UserProvider";

export function ActivitySwitch({}) {
  const switchId = "activityswitch";

  const { isActive, setIsActive } = useUserContext();

  const handleSwitchChange = (checked) => {
    setIsActive(checked);
    console.log("Activity:", isActive); // for debugging
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
