import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@radix-ui/react-switch";
import { ConfigSwitch } from "./ConfigSwitch";

export function ConfigTabs() {
  return (
    <Tabs defaultValue="account" className="w-[350px]">
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Konfiguration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <ConfigSwitch name={"Schlaf"} id={"sleep"} />
            </div>
            <div className="space-y-1">
              <ConfigSwitch name={"körperliche Aktivität"} id={"sport"} />
            </div>
            <div className="space-y-1">
              <ConfigSwitch name={"Wetter"} id={"weather"} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>weiter</Button>
            {/* weiter oder bestätigen? */}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
