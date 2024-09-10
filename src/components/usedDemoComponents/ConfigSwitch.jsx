import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ConfigSwitch({ id, name, toggle }) {
  
  return (
    <div className="flex items-center space-x-2">
      <Switch id={id} onClick={toggle} />
      <Label htmlFor={id}>{name}</Label>
    </div>
  );
}
