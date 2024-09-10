import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
// import { useState } from "react";

export function ConfigSwitch({ id, name, isActive, ontoggle }) {
  // const [toggleActive, setToggleActive] = useState(false);

  const handleToggle = () => {
    // setToggleActive(!toggleActive);
    // ontoggle(toggleActive);
    ontoggle(!isActive);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        onClick={handleToggle}
        // checked={toggleActive}
        checked={isActive}
        state={isActive ? "checked" : "unchecked"}
      />
      <Label htmlFor={id}>{name}</Label>
    </div>
  );
}
