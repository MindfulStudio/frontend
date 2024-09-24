import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserFeedbackText from "../typo/UserFeedbackText";
import EyeOpenIcon from "/src/assets/icons/eye-svgrepo-com.svg";
import EyeClosedIcon from "/src/assets/icons/eye-close-svgrepo-com.svg";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfigSwitch } from "./ConfigSwitch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

export function UserDataTabs() {
  // TODO: Logik für "Passwort vergessen" implementieren (Bonus)
  // TODO: Logik für "Email"-Änderung implementieren (Bonus) => hier wäre verification-Email nötig

  // show/hide old password
  const [showOldPassword, setShowOldPassword] = useState(false);
  // show/hide new password
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Local states:
  const [error, setError] = useState(null);
  const [valError, setValError] = useState(null);
  const [info, setInfo] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  // create state for userData:
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    config: {
      isConfigured: true,
      sleepingHours: true,
      physicalActivity: false,
      weather: false,
    },
  });

  // get user data from backend (at mounting)
  useEffect(() => {
    const getUserData = async () => {
      // fetching userData - GET:
      try {
        const baseURL = import.meta.env.VITE_baseURL;
        const pathURL = import.meta.env.VITE_basePathTwo;
        const response = await fetch(`${baseURL}${pathURL}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        // In case of userNotFound error:
        if (!response.ok) {
          setError({
            message:
              "Ein unerwarteter Fehler ist aufgetreten. Bitte loggen Sie sich neu ein.",
          });
          return;
        } else {
          // Set userData to values from database (except "isConfigured")
          setUserData({
            ...data.data,
            config: { ...data.data.config, isConfigured: true },
          });
        }
        return;
      } catch {
        // In case of any other server errors:
        setError({ message: "Ein unerwarteter Serverfehler ist aufgetreten." });
      }
    };
    getUserData();
  }, []);

  // validation function for username:
  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(userData.username)) {
      setValError({ message: "Nur Buchstaben und Zahlen sind erlaubt." });
    } else {
      setValError(null);
    }
  };

  // re-validate username on change:
  useEffect(() => {
    validateUsername();
  }, [userData.username]);

  // show/hide old password
  const handleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  // show/hide new password
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  // toggle config inputs on change:
  const handleToggle = (id) => {
    setUserData((prevData) => ({
      ...prevData,
      config: { ...prevData.config, [id]: !prevData.config[id] },
    }));
    setError(null);
    setInfo(null);
    setIsChanged(true);
  };

  // handle user data inputs on change (username & email):
  const handleChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
    setError(null);
    setInfo(null);
    setIsChanged(true);
  };

  // submit - send updated userData to backend:
  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetching userData - PATCH:
    try {
      const baseURL = import.meta.env.VITE_baseURL;
      const pathURL = import.meta.env.VITE_basePathTwo;
      const response = await fetch(`${baseURL}${pathURL}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const data = await response.json();
      // In case of userNotFound error:
      if (!response.ok) {
        setError({
          message:
            "Ein unerwarteter Fehler ist aufgetreten. Bitte loggen Sie sich neu ein.",
        });
        return;
      } else {
        setInfo({ message: "Daten erfolgreich aktualisiert." });
      }
      return data;
    } catch {
      // In case of any other server errors:
      setError({ message: "Ein unerwarteter Serverfehler ist aufgetreten." });
    }
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
          <form onSubmit={handleSubmit}>
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
                  onChange={(e) => handleChange(e)}
                  value={userData.username}
                  required
                />
                {valError && (
                  <UserFeedbackText
                    content={valError.message}
                    type={"validation"} // vllt. bei validation noch farben ändern? ist nicht gut zu erkennen
                  />
                )}
              </div>

              {/* email */}
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => handleChange(e)}
                  value={userData.email}
                  disabled // disabled, da bei Passworänderung auch neue Verification-Email notwendig wäre
                />
              </div>

              <CardDescription className="pt-2">
                Was möchtest du noch zusätzlich erfassen?
              </CardDescription>
              <div className="space-y-1">
                <ConfigSwitch
                  name={"Schlaf"}
                  id={"sleepingHours"}
                  handleToggle={handleToggle}
                  configData={userData.config}
                />
              </div>
              <div className="space-y-1">
                <ConfigSwitch
                  name={"körperliche Aktivität"}
                  id={"physicalActivity"}
                  handleToggle={handleToggle}
                  configData={userData.config}
                />
              </div>
              <div className="space-y-1">
                <ConfigSwitch
                  name={"Wetter"}
                  id={"weather"}
                  handleToggle={handleToggle}
                  configData={userData.config}
                />
              </div>
              {info && <UserFeedbackText content={info.message} type="info" />}
              {error && (
                <UserFeedbackText content={error.message} type="error" />
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={!isChanged || valError}>
                aktualisieren
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      {/* password */}
      {/* NOTICE: Es gibt hier noch keine wirkliche Funktionalität - wäre Bonus */}
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
            <Button type="submit">Passwort speichern</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
