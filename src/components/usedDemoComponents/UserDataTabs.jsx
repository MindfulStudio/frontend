import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EyeOpenIcon from "/src/assets/icons/eye-svgrepo-com.svg";
import EyeClosedIcon from "/src/assets/icons/eye-close-svgrepo-com.svg";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfigSwitch } from "./ConfigSwitch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

export function UserDataTabs() {
  // TODO: Logik fetchen
  // TODO: Logik buttons, inputValidation, toggles

  // show/hide old password
  const [showOldPassword, setShowOldPassword] = useState(false);
  // show/hide new password
  const [showNewPassword, setShowNewPassword] = useState(false);

  // kommt aus Provider?:
  const [username, setUsername] = useState("Luise");
  // kommt aus Provider?:
  const [email, setEmail] = useState("test@test.te");
  // kommt aus Provider?:
  const [sleepingHours, setSleepingHours] = useState(true);
  // kommt aus Provider?:
  const [physicalActivity, setPhysicalActivity] = useState(false);
  // kommt aus Provider?:
  const [weather, setWeather] = useState(false);

  // show/hide old password
  const handleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  // show/hide new password
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  // handleToggle sleep
  const handleToggleSleep = () => {
    setSleepingHours(!sleepingHours);
  };
  // console.log(sleepingHours);

  // handleToggle phsycialActivity
  const handleToggleActivity = () => {
    setPhysicalActivity(!physicalActivity);
  };

  // handleToggle phsycialWeather
  const handleToggleWeather = () => {
    setWeather(!weather);
  };

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
            <div className="space-y-1  w-24 h-24 rounded-full">
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
              <ConfigSwitch
                name={"Schlaf"}
                id={"sleep"}
                isActive={sleepingHours}
                ontoggle={handleToggleSleep}
              />
            </div>
            <div className="space-y-1">
              <ConfigSwitch
                name={"körperliche Aktivität"}
                id={"sport"}
                isActive={physicalActivity}
                ontoggle={handleToggleActivity}
              />
            </div>
            <div className="space-y-1">
              <ConfigSwitch
                name={"Wetter"}
                id={"weather"}
                isActive={weather}
                ontoggle={handleToggleWeather}
              />
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
          <CardContent className="space-y-2 relative">
            {/* TODO: passwort eingabefeld noch mit Auge versehen */}
            <div className="space-y-1">
              <Label htmlFor="current">Aktuelles Passwort</Label>
              <Input id="current" type="password" />
            </div>
            {showOldPassword ? (
              <EyeOpenIcon
                className="w-5 h-auto absolute right-8 top-8"
                onClick={handleShowOldPassword}
              />
            ) : (
              <EyeClosedIcon
                className="w-5 h-auto absolute right-8 top-8"
                onClick={handleShowOldPassword}
              />
            )}
            <div className="space-y-1">
              <Label htmlFor="new">Neues Passwort</Label>
              <Input id="new" type="password" />
            </div>
            {showNewPassword ? (
              <EyeOpenIcon
                className="w-5 h-auto absolute right-8 top-[107px]"
                onClick={handleShowNewPassword}
              />
            ) : (
              <EyeClosedIcon
                className="w-5 h-auto absolute right-8 top-[107px]"
                onClick={handleShowNewPassword}
              />
            )}
          </CardContent>
          <CardFooter>
            <Button>Passwort speichern</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
