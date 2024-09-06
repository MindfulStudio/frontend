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
import { CheckboxTherms } from "./Checkbox";
import { useState } from "react";

export function RegisterTabs() {
  // activate button after checkox ist checked:
  const [activeButton, setActiveButton] = useState(false);

  const activateButton = () => {
    setActiveButton(!activeButton);
  };

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Registrieren</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Passwort</Label>
              <Input id="password" placeholder="Passwort" />
            </div>
            <CheckboxTherms ontoggle={activateButton} />
          </CardContent>
          <CardFooter>
            {/* {activeButton && <Button>Registrieren</Button>} */}
            <Button disabled={!activeButton}>Registrieren</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
