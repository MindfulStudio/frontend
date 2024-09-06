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
import EyeOpenIcon from "/src/assets/icons/eye-svgrepo-com.svg";
import EyeClosedIcon from "/src/assets/icons/eye-close-svgrepo-com.svg";
import { useState } from "react";

// TODO: captcha
// TODO: frontend validation

export function RegisterTabs() {
  // activate button after checkox ist checked:
  const [activeButton, setActiveButton] = useState(false);
  // show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // activate button after checkox ist checked:
  const activateButton = () => {
    setActiveButton(!activeButton);
  };

  // show/hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // submit Input - register POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerDataToSend = new FormData();
    registerDataToSend.append("email", registerDataToSend.email);
    registerDataToSend.append("username", registerDataToSend.username);
    registerDataToSend.append("password", registerDataToSend.password);
  };
  console.log("userdata", registerDataToSend);

  return (
    <Tabs defaultValue="account" className="w-[350px]">
      <TabsContent value="account">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Registrieren</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Username" type="text" />
              </div>
              <div className="space-y-1 relative">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  placeholder="Passwort"
                  type={showPassword ? "text" : "password"}
                />
                {showPassword ? (
                  <EyeOpenIcon
                    className="w-5 h-auto absolute right-4 top-9"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <EyeClosedIcon
                    className="w-5 h-auto absolute right-4 top-9"
                    onClick={handleShowPassword}
                  />
                )}
              </div>
              <CheckboxTherms ontoggle={activateButton} />
            </CardContent>
            <CardFooter>
              {/* {activeButton && <Button>Registrieren</Button>} */}
              <Button disabled={!activeButton} type="submit">
                Registrieren
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
