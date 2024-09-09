import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfigSwitch } from "./ConfigSwitch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function UserDataTabs() {
  // NOTICE: vielleicht input validierung auslagern?
  // NOTICE: vielleicht das auge auslagern?
  // TODO: Profilbild auch in nav-bar einfügen
  // TODO: Logik fetchen
  // TODO: Logik buttons, inputValidation, toggle

  return (
    <Tabs defaultValue="account" className="w-[350px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Meine Nutzerdaten</TabsTrigger>
        <TabsTrigger value="password">Mein Password</TabsTrigger>
      </TabsList>
      {/* userprofile */}
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Meine Nutzerdaten</CardTitle>
            {/* vielleicht gibt es noch einen besseren Titel? */}
          </CardHeader>
          <CardContent className="space-y-2">
            {/* profile-image */}
            <div className="space-y-1 bg-lime-200 w-24 h-24 rounded-full">
              {/* Image für Profilbild einfügen */}
              <img
                src="/src/assets/profileImages/profileImgOne.png"
                alt="profile Image"
              />
            </div>

            {/* username */}
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                type="text"
                // onChange={handleChange}
                required
              />
              {/* {errorsVal.username && (
                  <UserFeedbackText
                    content={errorsVal.username}
                    type={"validation"} // vllt. bei validation noch farben ändern? ist nicht gut zu erkennen
                  />
                )} */}
            </div>

            {/* email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                // onChange={handleChange}
                required
              />
              {/* {errorsVal.email && (
                  <UserFeedbackText
                    content={errorsVal.email}
                    type={"validation"} // vllt. bei validation noch farben ändern? ist nicht gut zu erkennen
                  />
                )} */}
            </div>

            <CardDescription className="pt-2">
              Was möchtest du noch zusätzlich erfassen?
            </CardDescription>
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
      {/* password */}
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Passwort</CardTitle>
            <CardDescription>
              Ändern Sie hier Ihr Passwort. Nach dem Speichern werden Sie
              abgemeldet.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* TODO: passwort eingabefeld noch mit Auge versehen */}
            <div className="space-y-1">
              <Label htmlFor="current">Aktuelles Passwort</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Neues Passwort</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Passwort speichern</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
