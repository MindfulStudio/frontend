import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ConfigSwitch({ id, name, configData, handleToggle }) {
  return (
    <div className="flex items-center space-x-2">

      <Switch
        id={id}
        // if configData exists, check its boolean; otherwise: false:
        checked={configData ? configData[id] || false : true}
        onCheckedChange={() => handleToggle(id)}
      />

      <Label htmlFor={id}>{name}</Label>
    </div>
  );
}
