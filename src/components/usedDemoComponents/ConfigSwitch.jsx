import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ConfigSwitch({ id, name, configData, handleChange }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={configData[id]}
        onCheckedChange={() => handleChange(id)}
      />
      <Label htmlFor={id}>{name}</Label>
    </div>
  );
}
